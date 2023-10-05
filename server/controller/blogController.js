import Blog from "../models/Blog.js";
import cloudinary from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const createBlog = async (req, res) => {
  try {
  const { title, description } = req.body;
  const imageFile = req.file;

  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(imageFile.path, {
    folder: "test1", // Optional: specify folder to store the image
  });

  // Create a new blog object with the additional image and public_id fields
  const newBlog = new Blog({
    title,
    description,
    image: result.secure_url,
    public_id: result.public_id,
  });

    await newBlog.save();
    res.status(201).json(newBlog);
    
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).send("Server error");
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageFile = req.file;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update image in Cloudinary
    let imageUrl = blog.image;

    if (imageFile) {
      if (imageUrl) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadedImage = await cloudinary.uploader.upload(imageFile.path);
      imageUrl = uploadedImage.secure_url;
    }

    // Update blog in MongoDB
    blog.title = title;
    blog.description = description;
    blog.image = imageUrl;

    await blog.save();

    res.status(200).json({ message: 'Header updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Blog.findById(id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Check if public_id exists before trying to delete from Cloudinary
    if (post.public_id) {
      // delete file from Cloudinary
      const result = await cloudinary.uploader.destroy(post.public_id);
      console.log('Cloudinary deletion result:', result);
    } else {
      console.log('No public_id found, skipping Cloudinary deletion');
    }

    // Remove post from MongoDB
    await Blog.findByIdAndRemove(id);

    res.send(post);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).send('Server error');
  }
};


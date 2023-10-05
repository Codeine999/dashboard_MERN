import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        public_id: String, 
    },
    { timeseries: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;

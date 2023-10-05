import express from "express";
import { createBlog, getBlogs, getBlogById, updateBlog, deletePost } from "../controller/blogController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deletePost);

export default router;

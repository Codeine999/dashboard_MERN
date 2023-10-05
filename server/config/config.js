import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  folder: "test1", // กำหนดชื่อโฟลเดอร์ที่คุณต้องการเก็บไฟล์ภาพ
  allowedFormats: ["jpg", "jpeg", "png", "gif"],
});

const parser = multer({ storage: storage });

export default { cloudinary: cloudinary.v2, parser };

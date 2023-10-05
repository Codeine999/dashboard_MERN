import express from "express";
import multer from 'multer';
import { login, register} from "../controller/authController.js";
import { storageUsers, fileFilterUsers } from '../config/multerConfig.js';
import { auth, checkAdmin } from "../middleware/authMiddleware.js";


const uploadUsers = multer({ storage: storageUsers, fileFilter: fileFilterUsers }).single('image');
const router = express.Router();


router.post("/register", auth, checkAdmin, uploadUsers, register);
router.post("/login", login);


export default router;

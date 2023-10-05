import express from "express";
import multer from 'multer';
import {
        getAllUsers,
        getUserByEmail,
        currentUser,
        updateUsers,
        deleteUsers,
        getAllAdmin,
        changeRole
}
        from "../controller/usersController.js";
import { storageUsers, fileFilterUsers } from '../config/multerConfig.js';
import { auth, checkAdmin } from "../middleware/authMiddleware.js";

const uploadUsers = multer({ storage: storageUsers, fileFilter: fileFilterUsers }).single('image');
const router = express.Router();

router.get('/all', getAllUsers);
router.get('/user/:id', getUserByEmail);
router.get('/alladmin', auth, getAllAdmin);
router.post('/change-role', auth, checkAdmin, changeRole);
router.post('/currentUser', auth, currentUser);
router.put("/edit/:id", uploadUsers, updateUsers);
router.delete('/delete/:id', auth, checkAdmin, deleteUsers);



export default router;

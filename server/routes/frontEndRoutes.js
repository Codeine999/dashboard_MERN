import express from "express";
import multer from 'multer';
import { HeaderCrud } from "../controller/frontEndController.js"
import { storage, fileFilter } from '../config/multerConfig.js';


const upload = multer({ storage, fileFilter }).single('file');
const router = express.Router();


router.post('/', upload, HeaderCrud.createHeader);
router.get('/',  HeaderCrud.getHeader);
router.get('/:id',  HeaderCrud.getHeaderByID);
router.put("/:id", upload, HeaderCrud.updateHeader);




export default router;
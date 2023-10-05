import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cloudinary from 'cloudinary';


// data import

import { dataUser, dataProduct, dataProductStat, dataTransaction } from './data/index.js'
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import BlogRoutes from "./routes/blogRoutes.js"
import usersRoutes from "./routes/usersRoutes.js";
import frontEndRoutes from "./routes/frontEndRoutes.js"
import authRoutes from "./routes/authRoutes.js"


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('image'))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));



/* ROUTES */
app.use('/blog', BlogRoutes);
app.use("/user", usersRoutes);
app.use("/auth", authRoutes);
app.use("/update/header", frontEndRoutes);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// CONFIGURATION
const PORT = process.env.PORT || 600;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    mongoose.set('strictQuery', true);
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export default {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js"

dotenv.config(); 


export const auth = async (req, res, next) => {
  try {
    const token = req.headers['authtoken'];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
     
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    req.user = decoded.user;
    next();
 
  } catch (error) {
    res.status(401).json({ message: ' SOMETHING WRONG ' });
  }
};


export const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ firstname: req.user.firstname })
      .select('-password')
      .exec();

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Permission denied! Only admin can access this route." });

    } else {
      next();
    }

  } catch (error) {
    res.status(401).json({ message: "SOMETHING WAS WRONG" });
  }
};



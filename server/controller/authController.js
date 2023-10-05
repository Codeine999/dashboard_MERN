import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      file: req.file.path,
      firstname,
      lastname,
      email, 
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;             
    const user = await User.findOne({ email });
    const url = req.protocol + '://' + req.get('host');

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      // console.log(isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    }
    

    const payload = {
      user: {
        id: user._id,
        firstname: user.firstname,
        role: user.role,
        avatarUrl: url + '/' + user.file.replace('image/', '')
        }
    }; 

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ payload, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};
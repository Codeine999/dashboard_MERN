import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
      firstname: {
        type: String,
        required: true,
        min: 2,
        max: 15,
      },
      lastname: {
        type: String,
        required: true,
        min: 2,
        max: 10,
      },
      email: {
        type: String,
        required: true,
        max: 20,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 5,
      },
      role: {
        type: String,
        default: "user",
      },
      file: {
        type: String,
        default: 'noimage.jpg'
    },
    },
    { timestamps: true }
);

  
  const User = mongoose.model("User", UserSchema);
  
  export default User;
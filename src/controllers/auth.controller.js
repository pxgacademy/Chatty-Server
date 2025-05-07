import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// signup functionalities
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName)
      return res.status(400).json({ message: "Fill the required fields" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser?._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser?._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    console.log(`Error from signup controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login functionalities
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user?._id, res);
    res.status(201).json({
      _id: user?._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error from login controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout functionalities
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error from logout controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update profile functionalities
export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    const userId = req.user?._id;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });

    const uploadRes = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndDelete(
      userId,
      {
        profilePic: uploadRes?.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(`Error from update profile controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// checking user authentication functionalities
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req?.user)
  } catch (error) {
    console.log(`Error from checkAuth controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
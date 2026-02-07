// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// // @desc   Register a new user
// // @route  POST /api/users/register
// // @access Public
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({ name, email, password: hashedPassword });

//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc   Login user
// // @route  POST /api/users/login
// // @access Public
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc   Get user profile
// // @route  GET /api/users/profile
// // @access Private
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// export const registerUser = asyncHandler(async (req, res) => {
//   const { firstName, lastName, email, password, role } = req.body;

//   // Check if user exists
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create user
//   const user = await User.create({
//     firstName,
//     lastName,
//     email,
//     password: hashedPassword,
//     role,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       fullName: user.fullName, // always return full name
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//       message: "User registered successfully",
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// // @desc    Login user
// // @route   POST /api/users/login
// // @access  Public
// export const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       fullName: user.fullName,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// // controllers/userController.js
// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";

// // @desc Create or return current user (Firebase verified)
// // @route POST /api/users/me
// export const upsertCurrentUser = asyncHandler(async (req, res) => {
//   const { uid, email } = req.firebaseUser; // from firebaseAuth middleware
//   const { firstName, lastName, role } = req.body;

//   // try to find existing
//   let user = await User.findOne({ uid });

//   if (!user) {
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({
//         message: "firstName, lastName & email required first time"
//       });
//     }

//     user = await User.create({
//       uid,
//       firstName,
//       lastName,
//       email,
//       role: role || "chef-waiter"
//     });
//   }

//   res.json(user);
// });

// // @desc Get profile (only for logged in firebase user)
// // @route GET /api/users/profile
// export const getProfile = asyncHandler(async (req, res) => {
//   const { uid } = req.firebaseUser;
//   const user = await User.findOne({ uid }).select("-__v");

//   if (!user) return res.status(404).json({ message: "User not found" });

//   res.json(user);
// });

// server/controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * @desc    Create or update a user profile after Firebase authentication
 * @route   POST /api/users/create-profile
 * @access  Private (requires Firebase ID token)
 */
export const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const { uid, email } = req.firebaseUser; // Decoded from Firebase token
  const { firstName, lastName, role } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "First name and last name are required",
    });
  }

  let user = await User.findOne({ uid });

  // ✅ If user exists, update their profile
  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.role = role || user.role;
    await user.save();

    return res.json({
      message: "Profile updated successfully",
      user,
    });
  }

  // 🆕 If new user, create profile
  user = await User.create({
    uid,
    email,
    firstName,
    lastName,
    role: role || "chef-waiter",
  });

  res.status(201).json({
    message: "Profile created successfully",
    user,
  });
});

/**
 * @desc    Fetch logged-in user profile
 * @route   GET /api/users/profile
 * @access  Private (requires Firebase ID token)
 */
export const getProfile = asyncHandler(async (req, res) => {
  const { uid } = req.firebaseUser;

  const user = await User.findOne({ uid }).select("-__v");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "Profile fetched successfully",
    user,
  });
});

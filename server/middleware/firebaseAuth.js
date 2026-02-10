// server/middleware/firebaseAuth.js
import admin from "../config/firebaseAdmin.js";
import User from "../models/userModel.js";

// Standard Middleware: Verifies token AND requires user to be in MongoDB
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify token using Firebase Admin
    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUid = decoded.uid;

    // Fetch user from MongoDB
    const user = await User.findOne({ uid: decoded.uid });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found in database. Please complete profile." });
    }

    // Attach user info to request
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Lite Middleware: Verifies token ONLY (For initial signup/sync)
export const verifyTokenOnly = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUid = decoded.uid;
    req.firebaseEmail = decoded.email;
    next();
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

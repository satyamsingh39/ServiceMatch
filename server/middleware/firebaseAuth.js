// // server/middleware/firebaseAuth.js
// import admin from "../config/firebaseAdmin.js";

// export const verifyFirebaseToken = async (req, res, next) => {
//   try {
//     const header = req.headers.authorization || "";
//     const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = await admin.auth().verifyIdToken(token);
//     req.firebaseUser = decoded; // { uid, email, ... }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token", error: err.message });
//   }
// };

// server/middleware/firebaseAuth.js
import admin from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token using Firebase Admin
    const decoded = await admin.auth().verifyIdToken(token);

    // Attach user info to request for later use in controllers
    req.firebaseUser = decoded;

    next(); // ✅ continue to controller
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


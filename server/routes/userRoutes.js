// import express from "express";
// import { registerUser, getUsers } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.get("/", getUsers);

// export default router;


// import express from "express";
// import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", protect, getUserProfile);

// export default router;


// // server/routes/userRoutes.js
// import express from "express";
// import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
// import { upsertCurrentUser, getProfile } from "../controllers/userController.js";

// const router = express.Router();

// // Client sends Bearer <FirebaseIDToken>
// router.post("/me", verifyFirebaseToken, upsertCurrentUser); // create-if-not-exists / return existing
// router.get("/profile", verifyFirebaseToken, getProfile);    // example protected

// export default router;

// server/routes/userRoutes.js
import express from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { createOrUpdateProfile, getProfile } from "../controllers/userController.js";

const router = express.Router();

/**
 * @route   POST /api/users/create-profile
 * @desc    Create or update user profile in MongoDB (requires Firebase token)
 * @access  Private
 */
router.post("/create-profile", verifyFirebaseToken, createOrUpdateProfile);

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/profile", verifyFirebaseToken, getProfile);

export default router;






import express from "express";
import { syncUser, getMe } from "../controllers/auth.controller.js";
import { verifyTokenOnly, verifyFirebaseToken } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Public/Initial Sync: Only requires Firebase token to be valid
router.post("/sync", verifyTokenOnly, syncUser);

// Protected: Requires user to exist in MongoDB
router.get("/me", verifyFirebaseToken, getMe);

export default router;

import express from "express";
import { verifyTokenOnly, verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { syncUser, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

// Public-ish (Requires Firebase Token, but not DB User)
router.post("/sync", verifyTokenOnly, syncUser);

// Protected (Requires DB User)
router.get("/me", verifyFirebaseToken, getMe);

export default router;

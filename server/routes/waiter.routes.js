import express from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import {
    getDashboardStats,
    getJobs,
    applyForJob,
    getMyApplications,
} from "../controllers/waiter.controller.js";

const router = express.Router();

// All routes require Auth + 'chef-waiter' role
router.use(verifyFirebaseToken, requireRole("chef-waiter"));

router.get("/dashboard", getDashboardStats);
router.get("/jobs", getJobs);
router.post("/apply", applyForJob);
router.get("/applications", getMyApplications);

export default router;

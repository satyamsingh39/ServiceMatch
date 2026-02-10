import express from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import {
    getDashboardStats,
    createJob,
    getMyJobs,
    updateJob,
    getJobApplicants,
    updateApplicationStatus,
} from "../controllers/hotel.controller.js";

const router = express.Router();

// All routes require Auth + 'hotel-restaurant' role
router.use(verifyFirebaseToken, requireRole("hotel-restaurant"));

router.get("/dashboard", getDashboardStats);

router.route("/jobs")
    .post(createJob)
    .get(getMyJobs);

router.patch("/jobs/:id", updateJob);

router.get("/applications/:jobId", getJobApplicants);
router.patch("/applications/:id/status", updateApplicationStatus);

export default router;

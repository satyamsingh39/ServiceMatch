// server/routes/job.routes.js
import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  getMyJobs,
} from "../controllers/job.controller.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

// Public: View all jobs
router.get("/", getAllJobs);

// Protected: Employer only (Move these up to avoid conflicting with /:id)
router.get("/my-jobs", verifyFirebaseToken, requireRole("employer"), getMyJobs);

// Public: Get job by ID (Generic pattern at the bottom)
router.get("/:id", getJobById);

// Protected: Employer only
router.post("/", verifyFirebaseToken, requireRole("employer"), createJob);
router.delete("/:id", verifyFirebaseToken, requireRole("employer"), deleteJob);

export default router;

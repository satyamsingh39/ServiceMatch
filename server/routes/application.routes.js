// server/routes/application.routes.js
import express from "express";
import {
  applyToJob,
  getUserApplications,
  getEmployerApplications,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

// Protected: Job Seeker only
router.post("/", verifyFirebaseToken, requireRole("jobseeker"), applyToJob);
router.get("/my-applications", verifyFirebaseToken, requireRole("jobseeker"), getUserApplications);

// Protected: Employer only
router.get("/employer", verifyFirebaseToken, requireRole("employer"), getEmployerApplications);
router.patch("/:id", verifyFirebaseToken, requireRole("employer"), updateApplicationStatus);

export default router;

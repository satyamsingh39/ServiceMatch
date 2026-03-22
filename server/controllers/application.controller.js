// server/controllers/application.controller.js
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import asyncHandler from "express-async-handler";

/**
 * @desc    Apply to a job
 * @route   POST /api/applications
 * @access  Private (Job Seeker only)
 */
export const applyToJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Check if already applied
  const alreadyApplied = await Application.findOne({
    jobId,
    applicantId: req.user._id,
  });

  if (alreadyApplied) {
    res.status(400);
    throw new Error("You have already applied to this job");
  }

  const application = await Application.create({
    jobId,
    applicantId: req.user._id,
  });

  res.status(201).json({ success: true, data: application });
});

/**
 * @desc    Get applications for the current user (Job Seeker)
 * @route   GET /api/applications/my-applications
 * @access  Private (Job Seeker only)
 */
export const getUserApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicantId: req.user._id })
    .populate({
      path: "jobId",
      populate: { path: "employerId", select: "name" }
    })
    .sort("-appliedAt");

  res.status(200).json({ success: true, count: applications.length, data: applications });
});

/**
 * @desc    Get applications for the employer's jobs
 * @route   GET /api/applications/employer
 * @access  Private (Employer only)
 */
export const getEmployerApplications = asyncHandler(async (req, res) => {
  // First find all jobs by this employer
  const jobs = await Job.find({ employerId: req.user._id });
  const jobIds = jobs.map(job => job._id);

  const applications = await Application.find({ jobId: { $in: jobIds } })
    .populate("applicantId", "name email phone")
    .populate("jobId", "title")
    .sort("-appliedAt");

  res.status(200).json({ success: true, count: applications.length, data: applications });
});

/**
 * @desc    Update application status
 * @route   PATCH /api/applications/:id
 * @access  Private (Employer only)
 */
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate("jobId");

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  // Check if the current user is the employer of the job
  if (application.jobId.employerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this application");
  }

  application.status = status;
  await application.save();

  res.status(200).json({ success: true, data: application });
});

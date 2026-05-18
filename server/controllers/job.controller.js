// server/controllers/job.controller.js
import Job from "../models/Job.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

/**
 * @desc    Create a new job
 * @route   POST /api/jobs
 * @access  Private (Employer only)
 */
export const createJob = asyncHandler(async (req, res) => {
  console.log("Creating job for user:", req.user?._id);
  const { title, description, location, salary, jobType, requirements } = req.body;

  const job = await Job.create({
    employerId: req.user._id,
    title,
    description,
    location,
    salary,
    jobType,
    requirements,
  });

  res.status(201).json({ success: true, data: job });
});

/**
 * @desc    Get all jobs with filters
 * @route   GET /api/jobs
 * @access  Public
 */
export const getAllJobs = asyncHandler(async (req, res) => {
  const { search, location, jobType } = req.query;
  const query = { status: "Open" };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }
  if (jobType) {
    query.jobType = jobType;
  }

  const jobs = await Job.find(query).populate("employerId", "name email");
  res.status(200).json({ success: true, count: jobs.length, data: jobs });
});

/**
 * @desc    Get job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("employerId", "name email");

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json({ success: true, data: job });
});

/**
 * @desc    Delete job
 * @route   DELETE /api/jobs/:id
 * @access  Private (Owner only)
 */
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Check ownership
  if (job.employerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this job");
  }

  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job removed" });
});

/**
 * @desc    Get jobs posted by the employer
 * @route   GET /api/jobs/my-jobs
 * @access  Private (Employer only)
 */
export const getMyJobs = asyncHandler(async (req, res) => {
  console.log("Fetching jobs for employer:", req.user?._id);
  const jobs = await Job.find({ employerId: req.user._id });
  res.status(200).json({ success: true, count: jobs.length, data: jobs });
});

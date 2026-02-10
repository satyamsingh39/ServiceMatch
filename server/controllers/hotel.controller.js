import Job from "../models/Job.js";
import Application from "../models/Application.js";

/**
 * @desc    Get Hotel Dashboard Stats
 * @route   GET /api/hotel/dashboard
 */
export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // Stats
        const activeJobs = await Job.countDocuments({ hotelId: userId, status: "Open" });
        const totalApplications = await Application.countDocuments({ hotelId: userId });
        const shortlisted = await Application.countDocuments({ hotelId: userId, status: "Shortlisted" });
        const hired = await Application.countDocuments({ hotelId: userId, status: "Hired" });

        // Recent Applicants
        const recentApplicants = await Application.find({ hotelId: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("applicantId", "firstName lastName email")
            .populate("jobId", "title");

        res.status(200).json({
            success: true,
            data: {
                activeJobs,
                applications: totalApplications,
                shortlisted,
                hires: hired,
                recentApplicants,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Post a New Job
 * @route   POST /api/hotel/jobs
 */
export const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, requirements, jobType } = req.body;
        const hotelId = req.user._id;

        const job = await Job.create({
            hotelId,
            title,
            description,
            location,
            salary,
            requirements,
            jobType,
        });

        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get My Posted Jobs
 * @route   GET /api/hotel/jobs
 */
export const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ hotelId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update Job
 * @route   PATCH /api/hotel/jobs/:id
 */
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, hotelId: req.user._id });

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        Object.assign(job, req.body);
        await job.save();

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get Applicants for a Job
 * @route   GET /api/hotel/applications/:jobId
 */
export const getJobApplicants = async (req, res) => {
    try {
        // Verify job belongs to hotel
        const job = await Job.findOne({ _id: req.params.jobId, hotelId: req.user._id });
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found or unauthorized" });
        }

        const applications = await Application.find({ jobId: req.params.jobId })
            .populate("applicantId", "firstName lastName email")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update Application Status
 * @route   PATCH /api/hotel/applications/:id/status
 */
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findOne({ _id: req.params.id, hotelId: req.user._id });

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        if (!["Applied", "Shortlisted", "Rejected", "Hired"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

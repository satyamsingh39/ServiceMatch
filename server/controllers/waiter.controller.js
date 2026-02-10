import Job from "../models/Job.js";
import Application from "../models/Application.js";

/**
 * @desc    Get Waiter Dashboard Stats
 * @route   GET /api/waiter/dashboard
 */
export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // Recent applications
        const recentApplications = await Application.find({ applicantId: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("jobId", "title location salary");

        // Profile completion (mock calculation)
        const profileCompletion = 80;

        // Recommended jobs (mock logic: just recent open jobs)
        const recommendedJobs = await Job.find({ status: "Open" })
            .sort({ createdAt: -1 })
            .limit(3);

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    applicationsCount: await Application.countDocuments({ applicantId: userId }),
                    interviewsScheduled: 0, // Mock
                },
                profileCompletion,
                recommendedJobs,
                recentApplications,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get All Open Jobs
 * @route   GET /api/waiter/jobs
 */
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "Open" }).populate("hotelId", "firstName lastName");
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Apply for a Job
 * @route   POST /api/waiter/apply
 */
export const applyForJob = async (req, res) => {
    try {
        const { jobId, coverLetter } = req.body;
        const userId = req.user._id;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // Check if already applied
        const existingApp = await Application.findOne({ jobId, applicantId: userId });
        if (existingApp) {
            return res.status(400).json({ success: false, message: "You have already applied to this job" });
        }

        const application = await Application.create({
            jobId,
            applicantId: userId,
            hotelId: job.hotelId,
            coverLetter,
            status: "Applied",
        });

        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get My Applications
 * @route   GET /api/waiter/applications
 */
export const getMyApplications = async (req, res) => {
    try {
        const userId = req.user._id;
        const applications = await Application.find({ applicantId: userId })
            .populate({
                path: "jobId",
                select: "title location salary",
                populate: { path: "hotelId", select: "firstName lastName" }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

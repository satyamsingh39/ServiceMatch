import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // This will be a "chef-waiter"
            required: true,
        },
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Redundant but useful for querying hotel's applications quickly
            required: true,
        },
        status: {
            type: String,
            enum: ["Applied", "Shortlisted", "Rejected", "Hired"],
            default: "Applied",
        },
        coverLetter: { type: String },
        resumeUrl: { type: String }, // Optional link to resume
    },
    { timestamps: true }
);

// Compound index to prevent double application to same job
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: false }, // optional if remote/hybrid not relevant but good to have
        salary: { type: String, required: false },
        requirements: [{ type: String }], // Array of strings for requirements
        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Temporary"],
            default: "Full-time",
        },
        status: {
            type: String,
            enum: ["Open", "Closed", "Draft"],
            default: "Open",
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;

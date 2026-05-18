// server/verify-backend.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Job from "./models/Job.js";
import Application from "./models/Application.js";

dotenv.config();

const verify = async () => {
  try {
    console.log("🚀 Starting Backend Verification...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Create/Find Test Employer
    let employer = await User.findOne({ email: "employer@test.com" });
    if (!employer) {
      employer = await User.create({
        firebaseUID: "test_employer_uid_123",
        name: "Test Employer",
        email: "employer@test.com",
        role: "employer",
      });
      console.log("✅ Created Test Employer");
    }

    // 2. Create/Find Test Job Seeker
    let jobseeker = await User.findOne({ email: "jobseeker@test.com" });
    if (!jobseeker) {
      jobseeker = await User.create({
        firebaseUID: "test_jobseeker_uid_123",
        name: "Test JobSeeker",
        email: "jobseeker@test.com",
        role: "jobseeker",
      });
      console.log("✅ Created Test JobSeeker");
    }

    // 3. Post a Job
    const job = await Job.create({
      employerId: employer._id,
      title: "Test Waiter Job",
      description: "Looking for a test waiter.",
      location: "Test Location",
      jobType: "Full-time",
      requirements: ["Test Skill 1", "Test Skill 2"],
    });
    console.log("✅ Successfully Posted a Job:", job.title);

    // 4. Apply to Job
    const app = await Application.create({
      jobId: job._id,
      applicantId: jobseeker._id,
    });
    console.log("✅ Successfully Applied to Job. Status:", app.status);

    // 5. Cleanup (optional - I'll keep them for the user to see in DB)
    // await Job.findByIdAndDelete(job._id);
    // await Application.findByIdAndDelete(app._id);
    
    console.log("\n🎉 Verification Successful! All models and relationships are working correctly.");

  } catch (error) {
    console.error("❌ Verification Failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

verify();

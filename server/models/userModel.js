import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { 
      type: String, 
      enum: ["jobseeker", "employer"], 
      required: true 
    },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    experience: { type: String },
    skills: [{ type: String }],
    availability: { type: Map, of: String },
    profileCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

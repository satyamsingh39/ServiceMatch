// server/models/HotelProfile.js
import mongoose from "mongoose";

const hotelProfileSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    workHours: { type: String },
    businessType: { type: String, enum: ["hotel", "restaurant", "cafe", "club", "other"] },
  },
  { timestamps: true }
);

const HotelProfile = mongoose.model("HotelProfile", hotelProfileSchema);
export default HotelProfile;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;

//for old signup page format

// server/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true },        // Firebase UID (optional-but-ideal)
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true, lowercase: true },
    role:      { type: String, enum: ["chef-waiter", "hotel-restaurant"], default: "chef-waiter" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

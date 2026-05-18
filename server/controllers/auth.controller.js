// server/controllers/auth.controller.js
import User from "../models/userModel.js";

/**
 * @desc    Sync Firebase User with MongoDB
 * @route   POST /api/auth/sync
 * @access  Private (Firebase Token Only)
 */
export const syncUser = async (req, res) => {
    try {
        const { firebaseUid, firebaseEmail } = req;
        const { name, role, phone } = req.body;

        // Check if user exists (checking both fields for compatibility)
        let user = await User.findOne({ 
            $or: [{ firebaseUID: firebaseUid }, { uid: firebaseUid }] 
        });

        if (user) {
            // Update existing user if name/phone changed (optional sync)
            if (name || phone) {
                user.name = name || user.name;
                user.phone = phone || user.phone;
                await user.save();
            }
            return res.status(200).json({ success: true, data: user });
        }

        // Create new user
        // Validate role: ensure it's either jobseeker or employer
        const validRoles = ["jobseeker", "employer"];
        const userRole = validRoles.includes(role) ? role : "jobseeker";

        user = await User.create({
            uid: firebaseUid,
            firebaseUID: firebaseUid,
            email: firebaseEmail,
            name: name || "New User",
            role: userRole,
            phone: phone || "",
        });

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error("❌ Sync User Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * @desc    Get current user profile from MongoDB
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

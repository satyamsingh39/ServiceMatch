import User from "../models/userModel.js";

/**
 * @desc    Create or update user profile (Sync Firebase Auth with MongoDB)
 * @route   POST /api/auth/sync
 * @access  Private (Token Only)
 */
export const syncUser = async (req, res) => {
    try {
        const { firebaseUid, firebaseEmail } = req;
        const { name, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ uid: firebaseUid });

        if (user) {
            // Update existing if needed (optional)
            return res.status(200).json({ success: true, data: user });
        }

        // Create new user
        // Role validation
        const validRoles = ["chef-waiter", "hotel-restaurant"];
        const userRole = validRoles.includes(role) ? role : "chef-waiter"; // Default to waiter

        // Split name if provided
        let firstName = "New";
        let lastName = "User";
        if (name) {
            const parts = name.split(" ");
            firstName = parts[0];
            lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
        }

        user = await User.create({
            uid: firebaseUid,
            email: firebaseEmail,
            firstName,
            lastName,
            role: userRole,
        });

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error("❌ Sync User Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private (Full Auth)
 */
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

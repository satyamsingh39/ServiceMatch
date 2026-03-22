/**
 * Middleware to restrict access based on user role.
 * Assumes `req.user` is already populated by `verifyFirebaseToken`.
 *
 * @param {string[]} allowedRoles - Array of allowed roles (e.g. ["jobseeker", "employer"])
 */
export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have access to this resource.",
            });
        }
        next();
    };
};

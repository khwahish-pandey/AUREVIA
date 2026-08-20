import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        console.log("========== ADMIN AUTH ==========");

        console.log("Cookies received:", req.cookies);

        const { token } = req.cookies;

        console.log("Token exists:", !!token);

        if (!token) {
            console.log("❌ NO TOKEN");
            return res.status(401).json({
                message: "Unauthorized - No token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("✅ TOKEN VERIFIED");
        console.log("Decoded token:", decoded);

        req.adminemail = process.env.ADMIN_EMAIL;

        console.log("Admin email:", req.adminemail);

        next();

    } catch (error) {
        console.log("❌ JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Unauthorized",
            error: error.message
        });
    }
};

export default adminAuth;
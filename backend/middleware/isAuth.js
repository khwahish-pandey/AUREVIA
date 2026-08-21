import jwt from "jsonwebtoken";

export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("🍪 TOKEN RECEIVED:", token ? "YES" : "NO");

    if (!token) {
      console.log("❌ No token cookie received");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ TOKEN VERIFIED:", verify);

    req.userId = verify.userId;

    next();

  } catch (error) {
    console.log("❌ JWT ERROR:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

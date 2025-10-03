import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // If no cookie, check Authorization header
    if (!token && req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      } else {
        token = authHeader; // in case raw token is sent
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // For debugging while developing, uncomment:
    // console.log("verifyToken decoded:", decoded);

    // support both _id and id for compatibility
    const userId = decoded._id || decoded.id || decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload (no user id)" });
    }

    // attach a minimal user object
    req.user = { _id: userId, email: decoded.email };

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

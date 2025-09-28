import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info from token
    next(); // continue to route
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

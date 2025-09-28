import express from "express";
// ES module import
import { registerUser, login, logout } from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/client", verifyToken, (req, res) => {
  res.json({ message: `Hello User ${req.user.id}` });
});

export default router;

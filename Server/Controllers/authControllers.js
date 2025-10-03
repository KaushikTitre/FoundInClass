import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

//register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // NOTE: use _id (not id) and include email if you want
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie (optional) — helpful for cookie-based auth
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,    // set true in production with HTTPS
      sameSite: "lax",  // if frontend is different origin, consider 'none' + secure:true (production)
      maxAge: 1000 * 60 * 60 // 1 hour
    });

    // ALSO return token in response body (so front-end can use Bearer fallback)
    return res.json({ message: "Logged in", token, user: { _id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

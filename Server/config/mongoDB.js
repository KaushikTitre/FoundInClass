import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection error:", err);
  }
};

export default connectDB;


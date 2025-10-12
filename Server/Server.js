import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const Port = process.env.Port;


app.get('/',(req,res)=>{
    res.send("This is my first response");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/dashboard",userRoutes);
app.use("/api/home",userRoutes);

connectDB().then(()=>{
    app.listen(Port, () => {
        console.log(`Server running on port ${Port}`)});
    });



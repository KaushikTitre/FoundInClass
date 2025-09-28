import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());



app.get('/',(req,res)=>{
    res.send("This is my first response");
});

// Routes
app.use("/api/auth", authRoutes);

connectDB().then(()=>{
    app.listen(4000, () => {
        console.log("Server running on port 4000")});
    });



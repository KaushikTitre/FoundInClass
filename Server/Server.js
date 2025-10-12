import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const allowedOrigins = [
    "http://localhost:5173", // your local frontend
    "https://found-in-class.vercel.app"
];
const app = express();
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin (like Postman)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

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



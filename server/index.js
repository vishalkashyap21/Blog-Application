import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/user.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/blog.route.js";

import CommentRoute from "./routes/Comment.route.js";
import BlogLikeRoute from "./routes/Bloglike.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// routes setup
app.use('/api/auth',AuthRoute)
app.use('/api/user',UserRoute)
app.use('/api/category',CategoryRoute)
app.use('/api/blog',BlogRoute)
app.use('/api/comment',CommentRoute)
app.use('/api/blog-like', BlogLikeRoute)



// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});

app.use((err,req,res,next)=>{
const statusCode = err.statusCode || 500
const message = err.message || 'Internal server error'
res.status(statusCode).json({
    success:false,
    statusCode,
    message
})
})

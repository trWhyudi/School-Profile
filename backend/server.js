import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cloudinary from "cloudinary";
import cookie from "cookie-parser";
import fileUpload from "express-fileupload";
import teacherRoutes from "./routes/teacherRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

// port
const app = express();
const port=process.env.PORT || 6060;
const url=process.env.MONGO_URL;

// setup cloudinary
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

// Middleware
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookie());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    tempFileDir: "/tmp/",
    useTempFiles: true,
}));

// koneksi ke mongodb
mongoose.connect(url).then(()=>{
    console.log(`Koneksi ke database berhasil`);
}).catch((err)=> console.log("Database error", err));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/exam", examRoutes);
app.use("/api/v1/fee", feeRoutes);
app.use("/api/v1/result", resultRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/gallery", galleryRoutes);

// listen server
app.listen(port, () => {
    console.log(`Server di port ${port}`);
})

app.use(errorMiddleware);

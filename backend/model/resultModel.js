import mongoose, { Types } from "mongoose";

const resultSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
    },
    subject: {
        type: String,
        required: true,
    },
    marksObtained: {
        type: Number,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    }
})

const Result = mongoose.model("Result", resultSchema);
export default Result;
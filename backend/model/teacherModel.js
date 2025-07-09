import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject: {
        type: String,
        required: [true, "Subjek diperlukan"],
    },
    department: {
        type: String,
        required: [true, "Departemen diperlukan"],
    },
    hireDate: {
        type: String,
        required: [true, "Tanggal masuk guru diperlukan"],
    },
    qualification: {
        type: String,
        required: [true, "Tanggal Kualifikasi guru diperlukan"],
    },
});

const Teacher = new mongoose.model("Teacher", teacherSchema);
export default Teacher;
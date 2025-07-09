import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Hadir", "Tidak hadir"],
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
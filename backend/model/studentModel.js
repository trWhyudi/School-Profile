import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rollNumber: {
        type: Number,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    section: {
        type: String,
        required: true,
    },
    admissionDate: {
        type: Date,
        required: true,
    },
    guardianInfo: {
        name: String,
        phone: String,
        relation: String,
    }
});

const Student = new mongoose.model("Student", studentSchema);
export default Student;
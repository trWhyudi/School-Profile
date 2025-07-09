import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
})

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
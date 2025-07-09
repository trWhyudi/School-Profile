import mongoose, { Types } from "mongoose";

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    amount: {
        type: Number,
        required: true,
    },
    dueDate: Date,
    status: {
        type: String,
        enum: ["Dibayar", "Belum Dibayar"],
    },
    paymentDate: Date,
})

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;
import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sections: {
        type: [String],
        default: [],
    }
});

const Class = new mongoose.model("Class", classSchema);
export default Class;
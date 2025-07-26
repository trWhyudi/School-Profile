import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        public_id: String,
        url: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likesBy: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: "Admin",
    },
    image: {
        public_id: String,
        url: String,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
});

const News = mongoose.model("News", newsSchema);
export default News;

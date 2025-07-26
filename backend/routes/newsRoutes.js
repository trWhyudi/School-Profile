import express from "express";
import {
    createNews,
    deleteNews,
    getAllNews,
    updateNews,
    getSingleNews
} from "../controller/newsController.js";
import { adminTokenAuth } from "../middleware/auth.js";

const router = express.Router();

// buat data berita
router.post("/create-news", adminTokenAuth, createNews);
// ambil semua data berita
router.get("/get-all-news", getAllNews);
// ambil data berita berdasarkan id
router.get("/single-news/:id", getSingleNews);
// update data berita
router.put("/update-news/:id", adminTokenAuth, updateNews);
// hapus data berita
router.delete("/delete-news/:id", adminTokenAuth, deleteNews);

export default router;

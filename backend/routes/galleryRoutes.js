import express from "express";
import {
    createGalleryItem,
    getAllGalleryItems,
    likeGallery,
    updateGalleryItem,
    deleteGalleryItem
} from "../controller/galleryController.js";
import { adminTokenAuth } from "../middleware/auth.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// buat data galeri
router.post("/create-gallery", adminTokenAuth, createGalleryItem);
// ambil semua data galeri
router.get("/get-all-gallery", getAllGalleryItems);
// like data galeri
router.put("/like-gallery/:id", isAuthenticated, likeGallery);
// update data galeri
router.put("/update-gallery/:id", adminTokenAuth, updateGalleryItem);
// hapus data galeri
router.delete("/delete-gallery/:id", adminTokenAuth, deleteGalleryItem);

export default router;

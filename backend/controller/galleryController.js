import Gallery from "../model/galleryModel.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";

// Create new gallery image
export const createGalleryItem = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title || !req.files?.image) {
            return next(new ErrorHandler("Judul dan gambar wajib diisi", 400));
        }

        const { image } = req.files;

        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(image.mimetype)) {
            return next(new ErrorHandler("Format gambar tidak didukung", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        const newGallery = await Gallery.create({
            title,
            image: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
            },
        });

        res.status(201).json({
            success: true,
            message: "Gambar berhasil ditambahkan",
            gallery: newGallery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create gallery controller",
            error: error.message,
        })
    }
});

// Get all gallery items
export const getAllGalleryItems = errorHandleMiddleware(async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            gallery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all gallery controller",
            error: error.message,
        })
    }
});

// Like/unlike image
export const likeGallery = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { id } = req.params;
        const gallery = await Gallery.findById(id);
        if (!gallery) return next(new ErrorHandler("Galeri tidak ditemukan", 404));

        const userId = req.user._id.toString();

        const alreadyLiked = gallery.likesBy?.includes(userId);
        let message = "";

        if (alreadyLiked) {
            // Batalkan like
            gallery.likesBy = gallery.likesBy.filter(uid => uid.toString() !== userId);
            gallery.likes = Math.max((gallery.likes || 1) - 1, 0);
            message = "Gambar berhasil dibatalkan sukanya";
        } else {
            gallery.likesBy = [...(gallery.likesBy || []), userId];
            gallery.likes = (gallery.likes || 0) + 1;
            message = "Gambar berhasil disukai";
        }

        await gallery.save();

        res.status(200).json({
            success: true,
            message,
            likes: gallery.likes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di like gallery controller",
            error: error.message,
        })
    }
});

// Update gallery item
export const updateGalleryItem = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const gallery = await Gallery.findById(id);
        if (!gallery) return next(new ErrorHandler("Galeri tidak ditemukan", 404));

        // Update title
        if (title) gallery.title = title;

        // Update gambar jika ada
        if (req.files?.image) {
            const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
            const image = req.files.image;

            if (!allowedFormats.includes(image.mimetype)) {
            return next(new ErrorHandler("Format gambar tidak didukung", 400));
            }

            // Hapus gambar lama dari cloudinary
            if (gallery.image?.public_id) {
            await cloudinary.uploader.destroy(gallery.image.public_id);
            }

            const result = await cloudinary.uploader.upload(image.tempFilePath);
            gallery.image = {
            public_id: result.public_id,
            url: result.secure_url,
            };
        }

        await gallery.save();

        res.status(200).json({
            success: true,
            message: "Galeri berhasil diperbarui",
            gallery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di update gallery controller",
            error: error.message,
        })
    }
});

// Delete gallery item
export const deleteGalleryItem = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { id } = req.params;

        const gallery = await Gallery.findById(id);
        if (!gallery) return next(new ErrorHandler("Galeri tidak ditemukan", 404));

        // Hapus gambar dari cloudinary
        if (gallery.image?.public_id) {
            await cloudinary.uploader.destroy(gallery.image.public_id);
        }

        await gallery.deleteOne();

        res.status(200).json({
            success: true,
            message: "Galeri berhasil dihapus",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di delete gallery controller",
            error: error.message,
        })
    }
});
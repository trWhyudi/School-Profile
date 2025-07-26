import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import News from "../model/newsModel.js";
import cloudinary from "cloudinary";

// Create News
export const createNews = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        let imageData = null;

        if (req.files?.image) {
            const { image } = req.files;
            const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
            if (!allowedFormats.includes(image.mimetype)) {
                return next(new ErrorHandler("Format gambar tidak didukung!", 400));
            }

            const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                console.log("Cloudinary error:", cloudinaryResponse.error);
                return next(new ErrorHandler("Gagal upload gambar ke cloudinary", 500));
            }

            imageData = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            };
        }

        const news = await News.create({
            title,
            content,
            author: author || "Admin",
            image: imageData,
        });

        res.status(201).json({
            success: true,
            message: "Berita berhasil dibuat",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create news controller",
            error: error.message,
        })
    }
    
});

// Get All News
export const getAllNews = errorHandleMiddleware(async (req, res, next) => {
    try {
        const newsList = await News.find().sort({ publishedAt: -1 });

        res.status(200).json({
            success: true,
            message: "Daftar berita ditemukan",
            news: newsList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all news controller",
            error: error.message,
        })
    }
});

// Get Single News
export const getSingleNews = errorHandleMiddleware(async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return next(new ErrorHandler("Berita tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Berita ditemukan",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get single news controller",
            error: error.message,
        })
    }
});

// Update News
export const updateNews = errorHandleMiddleware(async (req, res, next) => {
    try {
        const {id} = req.params;
        const { title, content, author } = req.body;

        const news = await News.findById(id);
        if (!news) {
            return next(new ErrorHandler("Berita tidak ditemukan", 404));
        }

        if (req.files?.image) {
            const { image } = req.files;
            const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

            if (!allowedFormats.includes(image.mimetype)) {
                return next(new ErrorHandler("Format gambar tidak didukung", 400));
            }

            if (news.image?.public_id) {
                await cloudinary.uploader.destroy(news.image.public_id);
            }

            const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
            news.image = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            };
        }

        news.title = title || news.title;
        news.content = content || news.content;
        news.author = author || news.author;

        const updatedNews = await news.save();

        res.status(200).json({
            success: true,
            message: "Berita berhasil diperbarui",
            updatedNews,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di update news controller",
            error: error.message,
        })
    }
});

// Delete News
export const deleteNews = errorHandleMiddleware(async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return next(new ErrorHandler("Berita tidak ditemukan", 404));
        }

        // hapus gambar dari cloudinary
        if (news.image && news.image.public_id) {
            await cloudinary.uploader.destroy(news.image.public_id);
        }

        await news.deleteOne();

        res.status(200).json({
            success: true,
            message: "Berita berhasil dihapus",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di delete news controller",
            error: error.message,
        })
    }
});

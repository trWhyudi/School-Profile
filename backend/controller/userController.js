import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import User from "../model/userModel.js";
import { jsontoken } from "../utils/token.js";
import cloudinary from "cloudinary";

// register user
export const createUserController = errorHandleMiddleware(async(req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ErrorHandler("Gambar diperlukan", 404));
        }
        const {avatar} = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(avatar.mimetype)) {
            return next(new ErrorHandler("Format file tidak sesuai!", 400));
        }

        const {name, email, password, role, phone, address, dateOfBirth, gender} = req.body;

        // validator
        if (!name || !email || !password || !role || !phone || !address || !dateOfBirth || !gender){
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        // check user di database
        const exitingUser = await User.findOne({email})
        if (exitingUser) {
            return next(new ErrorHandler("Email sudah terdaftar", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath
        )

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error", cloudinaryResponse.error || "Error cloudinary tidak diketahui");
            return next(new ErrorHandler("Gagal untuk mengupload gambar ke cloudinary", 404));
        }
        
        const user = await User.create({
            name,
            email,
            password,
            phone,
            gender,
            address,
            role,
            dateOfBirth,
            avatar:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });
        jsontoken(user,"Berhasil membuat user", 201, res);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Gagal membuat user",
            error,
        })
    }
});

// login user
export const loginUserController = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return next(new ErrorHandler("Isi semua form yang tersedia", 400));
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Email atau password salah", 401));
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return next(new ErrorHandler("Email atau password salah", 401));
        }

        if (role !== user.role) {
            return next(new ErrorHandler("Role tidak sesuai dengan akun ini", 403));
        }

        jsontoken(user, "User berhasil login", 200, res);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di login controller",
            error,
        });
    }
});

// Register Admin
export const createAdminController = errorHandleMiddleware(async(req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ErrorHandler("Gambar diperlukan", 404));
        }
        const {avatar} = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(avatar.mimetype)) {
            return next(new ErrorHandler("Format file tidak sesuai!", 400));
        }

        const {name, email, password, role, phone, address, dateOfBirth, gender} = req.body;

        // validator
        if (!name || !email || !password || !role || !phone || !address || !dateOfBirth || !gender){
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        // check user di database
        const exitingUser = await User.findOne({email})
        if (exitingUser) {
            return next(new ErrorHandler("Email sudah terdaftar", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath
        )

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error", cloudinaryResponse.error || "Error cloudinary tidak diketahui");
            return next(new ErrorHandler("Gagal untuk mengupload gambar ke cloudinary", 404));
        }
        
        const user = await User.create({
            name,
            email,
            password,
            phone,
            gender,
            address,
            role: "Admin",
            dateOfBirth,
            avatar:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });
        jsontoken(user,"Berhasil membuat user", 201, res);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Gagal membuat user",
            error,
        })
    }
});

// ambil admin berdasarkan id
export const getSingleAdmin = errorHandleMiddleware(async(req, res, next) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) {
            return next(new ErrorHandler("Admin tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Admin ditemukan",
            admin,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di getSingleAdmin",
            error,
        })
    }
});

// logout admin
export const logOutAdmin = errorHandleMiddleware(async(req, res, next) => {
    res.status(200).cookie("adminToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).send({
        success: true,
        message: "Logout akun Admin berhasil",
    })
});

// ambil profil admin
export const getAdminProfile = errorHandleMiddleware(async(req, res, next) => {
    try {
        const admin = await User.findById(req.user._id);
        if (!admin || admin.role !== "Admin") {
            return next(new ErrorHandler("Admin tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Profil admin berhasil ditemukan",
            admin,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di admin profile",
            error,
        })
    }
});

// ambil user saat ini
export const getCurrentUser = errorHandleMiddleware(async(req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(new ErrorHandler("Gagal mengambil informasi user", 500));
    }
});

// ambil semua user
export const getAllUser = errorHandleMiddleware(async(req, res, next) => {
    try {
        const users = await User.find().select("-password");
        if (users.length === 0) {
            return next(new ErrorHandler("User tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Semua user berhasil ditemukan",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di getAllUser",
            error,
        })
    }
});
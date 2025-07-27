import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import User from "../model/userModel.js";
import { jsontoken } from "../utils/token.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

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

// update user
export const updateUserController = errorHandleMiddleware(async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id.toString()) {
            return next(new ErrorHandler("Akses ditolak", 403));
        }

        const userId = req.params.id;
        const { name, email, phone, address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
        return next(new ErrorHandler("User tidak ditemukan", 404));
        }

        if (req.files?.avatar) {
            const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
            const { avatar } = req.files;

            if (!allowedFormats.includes(avatar.mimetype)) {
                return next(new ErrorHandler("Format gambar tidak didukung", 400));
            }

            // Hapus avatar lama dari Cloudinary
            if (user.avatar?.public_id) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }

            // Upload avatar baru
            const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

            user.avatar = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            };
        }

        // update data
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        await user.save();

        res.status(200).json({
        success: true,
        message: "Profil berhasil diperbarui",
        user,
        });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler("Gagal memperbarui profil", 500));
    }
});

// delete user
export const deleteUserController = errorHandleMiddleware(async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id.toString()) {
            return next(new ErrorHandler("Akses ditolak", 403));
        }

        const user = await User.findById(req.params.id);

        if (!user) {
        return next(new ErrorHandler("User tidak ditemukan", 404));
        }

        // jika pakai cloudinary, hapus avatar juga
        if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        await user.deleteOne();

        res.status(200).json({
        success: true,
        message: "User berhasil dihapus",
        });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler("Gagal menghapus user", 500));
    }
});

// Lupa password
export const forgotPassword = errorHandleMiddleware(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User tidak ditemukan dengan email ini", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="text-align: center;">
            <h2 style="color: #1E90FF; margin-bottom: 10px;">Reset Password Akun Anda</h2>
            </div>

            <p style="font-size: 16px; color: #333;">Halo <strong>${user.name}</strong>,</p>
            <p style="font-size: 15px; color: #555;">
            Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah ini untuk melanjutkan proses reset:
            </p>

            <div style="text-align: center; margin: 30px 0;">
            <a href="${resetPasswordUrl}" style="background-color: #1E90FF; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Reset Password
            </a>
            </div>

            <p style="font-size: 14px; color: #777;">
            Link ini hanya berlaku selama <strong>15 menit</strong> untuk alasan keamanan. Jika Anda tidak meminta reset ini, Anda bisa mengabaikan email ini dan tidak ada perubahan yang akan dilakukan.
            </p>

            <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />

            <p style="font-size: 13px; color: #999; text-align: center;">
            © 2025 SMAN 1 Cibitung – Semua Hak Dilindungi.
            </p>
        </div>
    `;


    try {
        await sendEmail({
            to: user.email,
            subject: "Reset Password",
            text: `Reset password link: ${resetPasswordUrl}`,
            html: htmlContent,
        });

        res.status(200).json({
            success: true,
            message: `Email reset password telah dikirim ke ${user.email}`,
        });
    } catch (error) {
        console.error("Email send error:", error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler("Gagal mengirim email", 500));
    }
});

// Reset password
export const resetPassword = errorHandleMiddleware(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Token reset tidak valid atau kadaluarsa", 400));
    }

    const { password } = req.body;

    if (!password || password.length < 6) {
        return next(new ErrorHandler("Password minimal 6 karakter", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password berhasil diubah",
    });
});

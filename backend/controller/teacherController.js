import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Teacher from "../model/teacherModel.js";

// buat data guru
export const createTeacherController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const {userId, subject, department, hireDate, qualification} = req.body;
        if (!userId || !subject || !department || !hireDate || !qualification ) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        };

        const teacher = await Teacher.create({
            userId,
            subject,
            department,
            hireDate,
            qualification,
        });

        res.status(201).json({
            success: true,
            message: "Berhasil membuat data guru",
            teacher,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create teacher controller",
            error,
        })
    }
});

// ambil semua data guru
export const getAllTeacherController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const teachers = await Teacher.find().populate("userId");
        if (teachers.length === 0) {
            return next(new ErrorHandler("Guru tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "Menampilkan semua data guru berhasil",
            teachers,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all teacher controller",
            error,
        })
    }
});

// ambil data guru berdasarkan id
export const getSingleTeacher = errorHandleMiddleware(async(req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate("userId");
        if (!teacher) {
            return next(new ErrorHandler("Guru tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "Menampilkan data guru berhasil",
            teacher,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get single teacher",
            error,
        })
    }
});

// update data guru
export const updateTeacherController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true,
        });
        if (!teacher) {
            return next(new ErrorHandler("Guru tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "update data guru berhasil",
            teacher,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di update teacher controller",
            error,
        })
    }
});

// delete data guru
export const deleteTeacherController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id).populate("userId");
        if (!teacher || teacher.userId.role !== "Guru") {
            return next(new ErrorHandler("Guru tidak ditemukan", 404));
        };

        await teacher.deleteOne();

        res.status(200).json({
            success: true,
            message: "menghapus data guru berhasil",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di delete teacher controller",
            error,
        })
    }
});

// Logout
export const logOutTeacher = errorHandleMiddleware(async(req, res, next) => {
    res.status(200).cookie("teacherToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).send({
        success: true,
        message: "Logout akun Guru berhasil",
    })
});

// ambil profil guru
export const getTeacherController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const teacher = await Teacher.findOne({ userId: req.user._id }).populate("userId");
        if (!teacher) {
            return next(new ErrorHandler("Data guru tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Profil Guru berhasil ditemukan",
            teacher,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di teacher profile",
            error,
        })
    }
});
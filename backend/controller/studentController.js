import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Student from "../model/studentModel.js";

// buat data murid
export const createStudent = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { userId, rollNumber, classId, section, admissionDate, guardianInfo } = req.body;

        if (!userId || !rollNumber || !classId || !section || !admissionDate || !guardianInfo) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        const existingStudent = await Student.findOne({classId, rollNumber});
        if (existingStudent) {
            return next(new ErrorHandler("Absen ini sudah ada di kelas", 400));
        }

        const student = await Student.create({
            userId, 
            rollNumber, 
            classId, 
            section, 
            admissionDate, 
            guardianInfo
        });

        res.status(201).json({
            success: true,
            message: "Berhasil membuat data murid baru",
            student
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create student controller",
            error,
        })
    }
})

// ambil data murid berdasarkan id
export const singleStudent = errorHandleMiddleware(async(req, res, next) => {
    try {
        const student = await Student.findById(req.params.id).populate("userId").populate("classId");
        if (!student) {
            return next(new ErrorHandler("Data murid tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Data murid ditemukan",
            student,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single student",
            error,
        })
    }
});

// ambil semua murid
export const getAllStudent = errorHandleMiddleware(async(req, res, next) => {
    try {
        const student = await Student.find().populate("userId").populate("classId");
        if (student.length === 0) {
            return next(new ErrorHandler("Data murid tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Semua data murid berhasil ditemukan",
            student,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get All Student",
            error,
        })
    }
});

// update data murid
export const updatedStudent = errorHandleMiddleware(async(req, res, next) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true,
        });
        if (!student) {
            return next(new ErrorHandler("Data murid tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "update data murid berhasil",
            student,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di update student controller",
            error,
        })
    }
});

// delete data murid
export const deleteStudent = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate("userId");

        if (!student || student.userId.role !== "Murid") {
            return next(new ErrorHandler("Data murid tidak ditemukan", 404));
        };

        await student.deleteOne();

        res.status(200).json({
            success: true,
            message: "menghapus data murid berhasil",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di delete student controller",
            error,
        })
    }
});

// Logout
export const logOutStudent = errorHandleMiddleware(async(req, res, next) => {
    try {
        res.status(200).cookie("studentToken", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
        }).send({
            success: true,
            message: "Logout akun murid berhasil",
        })
    } catch (error) {
        next(new ErrorHandler("LogOut gagal", 500));
    }
});

// ambil profil murid
export const getStudentProfile = errorHandleMiddleware(async(req, res, next) => {
    try {
        const student = await Student.findOne({ userId: req.user._id }).populate("userId").populate("classId");
        if (!student) {
            return next(new ErrorHandler("Data murid tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Profil murid berhasil ditemukan",
            student,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get student profile",
            error,
        })
    }
});
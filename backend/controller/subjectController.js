import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Subject from "../model/subjectModel.js";

// Buat data mata pelajaran
export const createSubject = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { name, classId, teacherId } = req.body;
        if (!name || !classId || !teacherId) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        const subject = await Subject.create({
            name,
            classId,
            teacherId
        })

        res.status(201).json({
            success: true,
            message: "Berhasil membuat data mata pelajaran",
            subject,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create subject controller",
            error: error.message,
        })
    }
})

// ambil semua data mata pelajaran
export const getAllSubject = errorHandleMiddleware(async(req, res, next) => {
    try {
        const subjects = await Subject.find().populate("classId").populate({
            path: "teacherId",
            populate: {
                path: "userId",
                model: "User",
            }
        });

        if (subjects.length === 0) {
            return next(new ErrorHandler("Data mata pelajaran tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Semua data mata pelajaran berhasil ditemukan",
            subjects,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all subject controller",
            error: error.message,
        })
    }
})

// ambil data mata pelajaran berdasarkan id
export const singleSubject = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findById(id).populate("classId").populate("teacherId");
        if (!subject) {
            return next(new ErrorHandler("Data mata pelajaran tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Data mata pelajaran berhasil ditemukan",
            subject,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single subject controller",
            error: error.message,
        })
    }
})

// update data mata pelajaran
export const updatedSubject = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, classId } = req.body;
        const subject = await Subject.findById(id);

        if (!subject) {
            return next(new ErrorHandler("Mata pelajaran tidak ditemukan", 404))
        }

        subject.name = name||subject.name;
        subject.classId = classId||subject.classId;

        const updatedSubject = await subject.save();

        res.status(200).json({
            success: true,
            message: "Update data Mata pelajaran berhasil",
            updatedSubject,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di updated subject controller",
            error: error.message,
        })
    }
});

// hapus data mata pelajaran
export const deletedSubject = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findById(id);

        if (!subject) {
            return next(new ErrorHandler("Data Mata pelajaran tidak ditemukan", 404));
        }
        await subject.deleteOne();

        res.status(200).json({
            success: true,
            message: "Menghapus data Mata pelajaran berhasil",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di deleted subject controller",
            error: error.message,
        })
    }
})
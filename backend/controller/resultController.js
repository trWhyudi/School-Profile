import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Result from "../model/resultModel.js";

// Buat data hasil nilai
export const createResult = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { studentId, examId, subject, marksObtained, totalMarks, grade } = req.body;
        if (!studentId || !examId || !subject || !marksObtained || !totalMarks || !grade) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        if (marksObtained < 0 || totalMarks <= 0 || marksObtained > totalMarks) {
            return next(new ErrorHandler("Nilai yang diberikan tidak valid", 400));
        }
        
        const exitingResult = await Result.findOne({
            studentId,
            examId,
            subject
        })

        if (exitingResult) {
            return next(new ErrorHandler("Nilai akademik dari murid ini sudah ada", 400));
        }

        const result = await Result.create({
            studentId,
            examId,
            subject,
            marksObtained,
            totalMarks,
            grade,
        })

        res.status(201).json({
            success: true,
            message: "Berhasil membuat data nilai akademik",
            result,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create result controller",
            error: error.message,
        })
    }
})

// ambil semua data hasil nilai
export const getAllResult = errorHandleMiddleware(async (req, res, next) => {
    try {
        const results = await Result.find()
        .populate({
            path: 'studentId',
            populate: {
            path: 'userId',
            select: 'name email',
            },
        })
        .populate("examId");

        if (results.length === 0) {
        return next(new ErrorHandler("Data nilai akademik tidak ditemukan", 404));
        }

        res.status(200).json({
        success: true,
        message: "Semua data nilai akademik berhasil ditemukan",
        results,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Error di get all result controller",
        error: error.message,
        });
    }
});


// ambil data hasil nilai berdasarkan id
export const singleResult = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Result.findById(id).populate("studentId").populate("examId");
        if (!result) {
            return next(new ErrorHandler("Data nilai tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Data nilai berhasil ditemukan",
            result,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single result controller",
            error: error.message,
        })
    }
})

// update data hasil nilai
export const updatedResult = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { marksObtained, totalMarks } = req.body;

        if (marksObtained !== undefined && totalMarks !== undefined) {
            if (marksObtained < 0 || totalMarks <= 0 || marksObtained > totalMarks) {
                return next(new ErrorHandler("Nilai yang diberikan tidak valid", 400));
            }
        }

        const updatedResult = await Result.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true},
        ).populate("studentId").populate("examId");

        res.status(200).json({
            success: true,
            message: "Update data nilai berhasil",
            updatedResult,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di updated result controller",
            error: error.message,
        })
    }
});

// hapus data nilai
export const deletedResult = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Result.findOneAndDelete(id);

        if (!result) {
            return next(new ErrorHandler("Data nilai tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Menghapus data nilai berhasil",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di deleted result controller",
            error: error.message,
        })
    }
})
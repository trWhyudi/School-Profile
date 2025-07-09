import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Exam from "../model/examModel.js";
import Class from "../model/classModel.js";

// Buat data ujian
export const createExam = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { name, classId, startDate, endDate } = req.body;
        if (!name || !classId || !startDate || !endDate) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        const classExam = await Class.findById(classId);
        if (!classExam) {
            return next(new ErrorHandler("Kelas tidak tersedia", 404));
        }

        if (new Date(startDate) > new Date(endDate)) {
            return next(new ErrorHandler("Waktu mulai harus sebelum waktu selesai", 400));
        }

        const overlappingExam = await Exam.findOne({
            classId,
            $or: [
                {startDate: {$lte: new Date(endDate)}},
                {endDate: {$lte: new Date(startDate)}},
            ]
        })

        if (overlappingExam) {
            return next(new ErrorHandler("Waktu ujian sudah lewat", 400));
        }

        const exam = await Exam.create({
            name,
            classId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        })

        const populateExam = await Exam.findById(exam._id).populate(
            "classId",
            "name",
        )

        res.status(201).json({
            success: true,
            message: "Berhasil membuat data Ujian",
            populateExam,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create exam controller",
            error: error.message,
        })
    }
})

// ambil semua data ujian
export const getAllExam = errorHandleMiddleware(async(req, res, next) => {
    try {
        const exams = await Exam.find().populate("classId", "name");
        if (exams.length === 0) {
            return next(new ErrorHandler("Ujian tidak ditemukan", 400));
        }

        res.status(200).json({
            success: true,
            message: "Semua data ujian berhasil ditemukan",
            exams,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all exam controller",
            error: error.message,
        })
    }
})

// ambil ujian berdasarkan id
export const singleExam = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findById(id).populate("classId");
        
        if (!exam) {
            return next(new ErrorHandler("Ujian tidak ditemukan", 400));
        };

        res.status(200).json({
            success: true,
            message: "Menampilkan data ujian berhasil",
            exam,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single exam controller",
            error: error.message,
        })
    }
});

// update data ujian
export const updatedExam = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, startDate, endDate } = req.body;
        const exam = await Exam.findById(id);
        if (!exam) {
            return next(new ErrorHandler("Ujian tidak ditemukan", 400));
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            return next(new ErrorHandler("waktu mulai harus sebelum waktu selesai", 400));
        }

        if (startDate || endDate) {
            const newStart = startDate ? new Date(startDate) : exam.startDate;
            const newEnd = endDate ? new Date(endDate) : exam.endDate;

            const overlappingExam = await Exam.findOne({
                classId: exam.classId,
                _id: { $ne: exam._id },
                $or: [{ startDate: {$lte: newEnd}}, {endDate: {$gte: newStart}}],
            })

            if (overlappingExam) {
                return next(new ErrorHandler("Waktu ujian sudah lewat", 400));
            }
        }
        const updatedExam = await Exam.findByIdAndUpdate(
            id,
            {name, startDate, endDate},
            {new: true, runValidators: true},
        ).populate("classId", "name");

        res.status(200).json({
            success: true,
            message: "Update data ujian berhasil",
            updatedExam,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di updated exam controller",
            error: error.message,
        })
    }
});

// hapus data ujian
export const deletedExam = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findByIdAndDelete(id);
        if (!exam) {
            return next(new ErrorHandler("Ujian tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Menghapus data ujian berhasil",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di deleted exam controller",
            error: error.message,
        })
    }
})
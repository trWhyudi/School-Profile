import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Student from "../model/studentModel.js";
import Fee from "../model/feeModel.js";

// Buat data pembayaran
export const createFee = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { studentId, amount, dueDate, status, paymentDate } = req.body;
        if (!studentId || !amount || !dueDate || !status || !paymentDate) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return next(new ErrorHandler("Kelas tidak tersedia", 400));
        }

        const fee = await Fee.create({
            studentId,
            amount, 
            dueDate: new Date(dueDate), 
            status: "Belum Dibayar", 
            paymentDate: new Date(paymentDate),
        })

        const populateFee = await Fee.findById(fee._id).populate("studentId");

        res.status(201).json({
            success: true,
            message: "Berhasil membuat data pembayaran",
            populateFee,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create fee controller",
            error: error.message,
        })
    }
})

// ambil semua data ujian
export const getAllFee = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { status, studentId, dueDate } = req.query;
        let query = {};
        if (status) query.status = status;
        if (studentId) query.studentId = studentId;
        if (dueDate) query.dueDate = dueDate;

        const fees = await Fee.find(query).populate("studentId", "name rollNumber classId").sort("-dueDate");

        res.status(200).json({
            success: true,
            message: "Semua data pembayaran berhasil ditemukan",
            fees,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all fee controller",
            error: error.message,
        })
    }
})

// ambil data pembayaran berdasarkan id
export const singleFee = errorHandleMiddleware(async(req, res, next) => {
    try {
        const fee = await Fee.findById(req.params.id).populate("studentId");
        if (!fee) {
            return next(new ErrorHandler("Pembayaran tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Data pembayaran berhasil ditemukan",
            fee,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single fee controller",
            error: error.message,
        })
    }
})

// update data pembayaran
export const updatedFee = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const { classId, amount, dueDate, status } = req.body;

        const updatedFee = await Fee.findByIdAndUpdate(
            id,
            {classId, amount, dueDate, status },
            {new: true},
        );

        res.status(200).json({
            success: true,
            message: "Update data pembayaran berhasil",
            updatedFee,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di updated fee controller",
            error: error.message,
        })
    }
});

// hapus data pembayaran
export const deletedFee = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const fee = await Fee.findById(id);

        if (!fee) {
            return next(new ErrorHandler("Pembayaran tidak ditemukan", 404));
        }

        if (fee.status?.trim() === "Dibayar") {
            return next(new ErrorHandler("Tidak bisa menghapus data pembayaran", 400));
        }

        await Fee.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Menghapus data pembayaran berhasil",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di deleted fee controller",
            error: error.message,
        })
    }
})
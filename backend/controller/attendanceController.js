import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Attendance from "../model/attendanceModel.js";
import Student from "../model/studentModel.js";
import Class from "../model/classModel.js";

//  buat data kehadiran
export const createAttendance = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { studentId, classId, date, status } = req.body;
        if (!studentId || !classId || !date || !status) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return next(new ErrorHandler("Murid tidak ditemukan", 404));
        }

        const classExists = await Class.findById(classId);
        if (!classExists) {
            return next(new ErrorHandler("Kelas tidak ditemukan", 404))
        }

        const existingAttendance = await Attendance.findOne({
            studentId, 
            date: new Date(date)
        })

        if (existingAttendance) {
            return next(new ErrorHandler("Kehadiran murid sudah berhasil dicatat", 400));
        }

        const attendance = await Attendance.create({
            studentId,
            classId,
            date: new Date(date),
            status,
        })

        const populatedAttendance = await Attendance.findById(attendance._id).populate("studentId","name rollNumber").populate("classId", "name");
        
        res.status(201).json({
            success: true,
            message: "Berhasil membuat daftar kehadiran",
            populatedAttendance,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create attendance controller",
            error: error.message,
        })
    }
})

// ambil semua data kehadiran
export const getAllAttendance = errorHandleMiddleware(async(req, res, next) => {
    try {
        const attendance = await Attendance.find().populate({
            path: "studentId",
            populate: {
                path: "userId",
                select: "name",
            },
        }).populate("classId", "name");
        if (attendance.length === 0) {
            return next(new ErrorHandler("Kehadiran tidak dapat ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Semua data kehadiran berhasil ditemukan",
            attendance,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all attendance controller",
            error: error.message,
        })
    }
})

// ambil kehadiran berdasarkan id
export const singleAttendance = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findById(id).populate("studentId").populate("classId");
        
        if (!attendance) {
            return next(new ErrorHandler("Kehadiran tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "Menampilkan data Kehadiran berhasil",
            attendance,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single attendance controller",
            error: error.message,
        })
    }
});

// update data kehadiran
export const updateAttendance = errorHandleMiddleware(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { studentId, classId, date, status } = req.body;

        const attendanceRecord = await Attendance.findById(id);
        if (!attendanceRecord) {
            return next(new ErrorHandler("Data kehadiran tidak ditemukan", 404));
        }

        // Cek murid
        if (studentId && studentId !== attendanceRecord.studentId.toString()) {
            const student = await Student.findById(studentId);
            if (!student) {
                return next(new ErrorHandler("Murid tidak ditemukan", 404));
            }
        }

        // Cek kelas
        if (classId && classId !== attendanceRecord.classId.toString()) {
            const classes = await Class.findById(classId);
            if (!classes) {
                return next(new ErrorHandler("Kelas tidak ditemukan", 404));
            }
        }

        // Update field
        attendanceRecord.studentId = studentId || attendanceRecord.studentId;
        attendanceRecord.classId = classId || attendanceRecord.classId;
        attendanceRecord.date = date ? new Date(date) : attendanceRecord.date;
        attendanceRecord.status = status || attendanceRecord.status;

        // Simpan perubahan
        const savedAttendance = await attendanceRecord.save();

        // Populate hasil update
        const updatedAttendance = await Attendance.findById(savedAttendance._id)
            .populate("studentId", "userId name")
            .populate("classId", "name");

        res.status(200).json({
            success: true,
            message: "Update data kehadiran berhasil",
            populateAttendance: updatedAttendance,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di update attendance controller",
            error: error.message,
        });
    }
});

// delete data kehadiran
export const deleteAttendance = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Attendance.findByIdAndDelete(id);
        if (!deleted) {
            return next(new ErrorHandler("Kehadiran tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "menghapus data kehadiran berhasil",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di delete attendance controller",
            error: error.message,
        })
    }
});
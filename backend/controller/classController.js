import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Class from "../model/classModel.js";

// buat data kelas
export const createClassController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { name, sections } = req.body;
        if (!name) {
            return next(new ErrorHandler("Isi form yang tersedia", 400));
        }

        const existingClass = await Class.findOne({name});
        if (existingClass) {
            return next(new ErrorHandler("Nama kelas ini sudah ada", 400));
        }

        const classData = await Class.create({
            name,
            sections: sections || [],
        })

        res.status(201).json({
            success: true,
            message: "Berhasil membuat kelas baru",
            classData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di create class controller",
            error,
        })
    }
})

// ambil semua data kelas
export const getAllClassController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const classes = await Class.find().sort("name");
        if (classes.length === 0) {
            return next(new ErrorHandler("Data kelas tidak ditemukan", 404));
        }

        res.status(200).json({
            success: true,
            message: "Semua data Kelas berhasil ditemukan",
            classes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di get all class controller",
            error,
        })
    }
})

// ambil kelas berdasarkan id
export const singleClassController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const classData = await Class.findById(id)
        
        if (!classData) {
            return next(new ErrorHandler("Kelas tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "Menampilkan data kelas berhasil",
            classData,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di single class controller",
            error,
        })
    }
});

// update data kelas
export const updateClassController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { sections } = req.body;
        const classData = await Class.findById(req.params.id);

        if (!classData) {
            return next(new ErrorHandler("Kelas tidak ditemukan", 404));
        };

        classData.sections = sections || classData.sections;
        const updatedClass = await classData.save();

        res.status(200).json({
            success: true,
            message: "update data kelas berhasil",
            updatedClass,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di update class controller",
            error,
        })
    }
});

// delete data kelas
export const deleteClassController = errorHandleMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        const deleteClass = await Class.findByIdAndDelete(id);
        if (!deleteClass) {
            return next(new ErrorHandler("Kelas tidak ditemukan", 404));
        };

        res.status(200).json({
            success: true,
            message: "menghapus data kelas berhasil",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error di delete class controller",
            error,
        })
    }
});
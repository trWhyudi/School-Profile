import express from "express";
import { createStudent, deleteStudent, getAllStudent, getStudentProfile, logOutStudent, singleStudent, updatedStudent } from "../controller/studentController.js";
import { isAuthenticated, studentToken } from "../middleware/auth.js";

const router = express.Router();

// buat data siswa
router.post("/create-student", createStudent);
// ambil data siswa berdasarkan id
router.get("/get-single-student/:id", singleStudent);
// ambil data semua murid
router.get("/get-all-student", getAllStudent);
// update data murid
router.put("/updated-student/:id", updatedStudent);
// delete data murid
router.delete("/deleted-student/:id", deleteStudent);
// logout murid
router.get("/logOut-student", studentToken, logOutStudent);
// ambil profil murid
router.get("/profile", isAuthenticated, studentToken, getStudentProfile);

export default router;
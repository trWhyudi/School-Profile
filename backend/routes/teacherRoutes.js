import express from "express";
import { createTeacherController, deleteTeacherController, getAllTeacherController, getSingleTeacher, getTeacherController, logOutTeacher, updateTeacherController } from "../controller/teacherController.js";
import { adminTokenAuth, isAuthenticated, teacherTokenAuth } from "../middleware/auth.js";

const router = express.Router();
// buat data guru
router.post("/create-teacher", adminTokenAuth, createTeacherController);
// ambil semua data guru
router.get("/get-all-teacher", getAllTeacherController);
// ambil data guru berdasarkan id
router.get("/single-teacher/:id", adminTokenAuth, getSingleTeacher);
// update data guru
router.put("/update-teacher/:id", adminTokenAuth, updateTeacherController);
// delete data guru
router.delete("/delete-teacher/:id", deleteTeacherController);
// logout guru
router.get("/logOut-teacher", teacherTokenAuth, logOutTeacher);
// profil guru
router.get("/me", isAuthenticated, teacherTokenAuth, getTeacherController);

export default router;
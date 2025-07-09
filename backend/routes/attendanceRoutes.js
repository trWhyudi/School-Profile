import express from "express";
import { adminTokenAuth } from "../middleware/auth.js";
import { createAttendance, deleteAttendance, getAllAttendance, singleAttendance, updateAttendance } from "../controller/attendanceController.js";

const router = express.Router();

// buat data kehadiran
router.post("/create-attendance", adminTokenAuth, createAttendance);
// ambil semua data kehadiran
router.get("/get-all-attendance", adminTokenAuth, getAllAttendance);
// ambil kehadiran berdasarkan id
router.get("/single-attendance/:id", singleAttendance);
// update data kehadiran
router.put("/updated-attendance/:id", adminTokenAuth, updateAttendance);
// hapus data kehadiran
router.delete("/deleted-attendance/:id", adminTokenAuth, deleteAttendance);

export default router;
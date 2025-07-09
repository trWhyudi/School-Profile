import express from "express";
import { createExam, deletedExam, getAllExam, singleExam, updatedExam } from "../controller/examController.js";

const router = express.Router();

// Buat data ujian
router.post("/create-exam", createExam);
// ambil semua data ujian
router.get("/get-all-exams", getAllExam);
// ambil data ujian berdasarkan id
router.get("/single-exam/:id", singleExam);
// update data ujian
router.put("/updated-exam/:id", updatedExam);
// hapus data ujian
router.delete("/deleted-exam/:id", deletedExam);

export default router;
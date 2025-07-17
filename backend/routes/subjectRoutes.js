import express from "express";
import { createSubject, deletedSubject, getAllSubject, singleSubject, updatedSubject } from "../controller/subjectController.js";

const router = express.Router();

// buat data mata pelajaran
router.post("/create-subject", createSubject);
// ambil semua data mata pelajaran
router.get("/get-all-subjects", getAllSubject);
// ambil data mata pelajaran berdasarkan id
router.get("/single-subject/:id", singleSubject);
// update data mata pelajaran
router.put("/update-subject/:id", updatedSubject);
// hapus data mata pelajaran
router.delete("/delete-subject/:id", deletedSubject);

export default router;
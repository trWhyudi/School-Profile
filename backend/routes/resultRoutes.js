import express from "express";
import { createResult, deletedResult, getAllResult, singleResult, updatedResult } from "../controller/resultController.js";

const router = express.Router();

// buat data nilai
router.post("/create-result", createResult);
// ambil semua data nilai
router.get("/get-all-result", getAllResult);
// ambil data nilai berdasarkan id
router.get("/single-result/:id", singleResult);
// update data nilai
router.put("/update-result/:id", updatedResult);
// hapus data nilai
router.delete("/delete-result/:id", deletedResult);

export default router;
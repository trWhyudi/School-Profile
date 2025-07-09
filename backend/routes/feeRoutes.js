import express from "express";
import { createFee, deletedFee, getAllFee, singleFee, updatedFee } from "../controller/feeController.js";

const router = express.Router();

// buat data pembayaran
router.post("/create-fee", createFee);
// ambil semua data pembayaran
router.get("/get-all-fee", getAllFee);
// ambil data pembayaran berdasarkan id
router.get("/single-fee/:id", singleFee);
// update data pembayaran
router.put("/updated-fee/:id", updatedFee);
// hapus data pembayaran
router.delete("/deleted-fee/:id", deletedFee);

export default router;
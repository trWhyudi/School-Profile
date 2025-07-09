import express from "express";
import { createClassController, deleteClassController, getAllClassController, singleClassController, updateClassController } from "../controller/classController.js";
import { adminTokenAuth } from "../middleware/auth.js";

const router = express.Router();

// buat data kelas
router.post("/create-class", adminTokenAuth, createClassController);
// ambil semua data kelas
router.get("/get-all-classes", adminTokenAuth, getAllClassController);
// ambil kelas berdasarkan id
router.get("/single-class/:id", adminTokenAuth, singleClassController);
// update data kelas
router.put("/updated-class/:id", adminTokenAuth, updateClassController);
// delete kelas
router.delete("/deleted-class/:id", adminTokenAuth, deleteClassController)

export default router;
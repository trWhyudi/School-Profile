import express from "express";
import { createAdminController, createUserController, getAdminProfile, getAllUser, getCurrentUser, getSingleAdmin, loginUserController, logOutAdmin } from "../controller/userController.js";
import { adminTokenAuth, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// buat user
router.post("/create-user", createUserController);
// login user
router.post("/login-user", loginUserController);
// buat admin
router.post("/create-admin", adminTokenAuth, createAdminController);
// ambil admin
router.get("/single-admin/:id", adminTokenAuth, getSingleAdmin);
// logout admin
router.get("/logOut-admin", adminTokenAuth, logOutAdmin);
// ambil profil admin
router.get("/admin-profile", isAuthenticated, adminTokenAuth, getAdminProfile);
// ambil user saat ini
router.get("/me", isAuthenticated, getCurrentUser);
// ambil semua user
router.get("/all-users", isAuthenticated, getAllUser);

export default router;
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import ErrorHandler from "./errorMiddleware.js";
import { errorHandleMiddleware } from "./errorHandleMiddleware.js";

// auth untuk registrasi user
export const isAuthenticated = async (req, res, next) => {
    const token = 
    req.cookies.adminToken || 
    req.cookies.teacherToken ||
    req.cookies.studentToken;

    if (!token) {
        return next(new ErrorHandler("ID User tidak terautentikasi", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorHandler("User tidak ditemukan", 404));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
};

// auth untuk token murid
export const studentToken = errorHandleMiddleware(async (req, res, next) => {
    const token = req.cookies.studentToken;
    if (!token) {
        return next(new ErrorHandler("Pelajar tidak terautentikasi", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user || req.user.role !== "Murid") {
            return next(new ErrorHandler("User tidak diizinkan", 403));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});

// auth untuk token guru
export const teacherTokenAuth = errorHandleMiddleware(async (req, res, next) => {
    const token = req.cookies.teacherToken;
    if (!token) {
        return next(new ErrorHandler("Guru tidak terautentikasi", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user || req.user.role !== "Guru") {
            return next(new ErrorHandler("User tidak diizinkan", 403));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});

// auth untuk token guru
export const adminTokenAuth = errorHandleMiddleware(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin tidak terautentikasi", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user || req.user.role !== "Admin") {
            return next(new ErrorHandler("User tidak diizinkan", 403));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});


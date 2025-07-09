class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Server error";
    err.statusCode = err.statusCode || 500;
    if (err.code === 11000) {
        err = new ErrorHandler(`Duplikasi ${Object.keys(err.keyValue)} masukkan`, 400);
    }

    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("Json web token invalid, silahkan coba ulang", 400);
    }
    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("Json web token sudah kadaluarsa, silahkan coba ulang", 400);
    }
    if (err.name === "CastError") {
        err = new ErrorHandler(`Invalid ${err.path}`, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map((e)=>e.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
}

export default ErrorHandler;
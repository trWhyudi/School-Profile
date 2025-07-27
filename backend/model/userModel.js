import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nama diperlukan"],
        minLength: [3, "Nama minimal memiliki 3 karakter"]
    },
    email: {
        type: String,
        required: [true, "Email diperlukan"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Masukkan alamat email yang valid"],
    },
    password: {
        type: String,
        required: [true, "Password diperlukan"],
        minLength: [6, "Password minimal memiliki 6 karakter"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Role diperlukan"],
        enum: ["Admin", "Murid", "Guru"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    phone: {
        type: String,
        required: [true, "Nomor telepon diperlukan"],
        match: [/^\d{11,}$/, "Nomor telepon minimal memiliki 11 digit"],
    },
    gender: {
        type: String,
        required: [true, "Gender diperlukan"],
        enum: ["Laki-laki", "Perempuan"]
    },
    address: {
        type: String,
        required: [true, "Alamat diperlukan"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Tanggal lahir diperlukan"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
    
});

// hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// compare password
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// json web token generate
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign(
    {
        id: this._id,
        role: this.role,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// generate reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
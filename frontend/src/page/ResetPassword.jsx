import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/user/reset-password/${token}`,
        { password }
      );

      if (response.data.success) {
        toast.success("Password berhasil direset. Anda akan diarahkan ke login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(response.data.message || "Gagal mereset password");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat mereset password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 py-8 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-600">
            Reset Password
          </h2>
          <p className="text-gray-600 mt-2">Masukkan password baru Anda</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <FaLock className="text-gray-500 mr-3 flex-shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password Baru"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 ml-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
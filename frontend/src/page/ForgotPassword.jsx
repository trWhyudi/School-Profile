import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope, FaSignInAlt, FaKey } from 'react-icons/fa'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Mohon isi email.')
      return
    }

    try {
      const { data } = await axios.post(
        'http://localhost:5050/api/v1/user/forgot-password',
        { email },
        { withCredentials: true }
      )

      if (!data.success) {
        toast.error(data.message || 'Gagal mengirim email reset password')
      } else {
        toast.success(`Email reset password telah dikirim ke ${email}`)
        setEmail('') // reset email field
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan jaringan')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 py-8 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-600">Lupa Password</h2>
          <p className="text-gray-600 mt-2">Masukkan email Anda untuk menerima link reset password.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <FaEnvelope className="text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            Kirim Link Reset Password
          </button>

          <div className="flex justify-between items-center pt-4 text-sm">
            <Link to="/register" className="text-sky-600 hover:text-sky-800 flex items-center">
              <FaSignInAlt className="mr-1" /> Buat Akun Baru
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-800 flex items-center">
              <FaKey className="mr-1" /> Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword

import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Context } from '../main'
import { toast } from 'react-toastify'
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserTag, 
  FaSignInAlt, 
  FaKey 
} from 'react-icons/fa'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error] = useState("")
  const navigate = useNavigate();
  const {setIsAuth, setUser} = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5050/api/v1/user/login-user", 
        { email, password, role },
        {withCredentials: true}
      );

      setIsAuth(true);
      setUser(data.user);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Gagal");
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 py-8 px-4'>
      <div className='bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md'>
          <div className='text-center mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold text-sky-600'>Login</h2>
              <p className='text-gray-600 mt-2'>Isi formulir berikut untuk mendaftar</p>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm mb-4">{error}</p>
          )}
          
          <form className='space-y-4' onSubmit={handleLogin}>
              {/* Email Field */}
              <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                  <FaEnvelope className='text-gray-500 mr-3 flex-shrink-0'/>
                  <input 
                      type="email" 
                      placeholder='Email' 
                      className='w-full outline-none text-gray-700 placeholder-gray-400'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </div>
              
              {/* Password Field */}
              <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                  <FaLock className='text-gray-500 mr-3 flex-shrink-0'/>
                  <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder='Password (Minimal 6 Karakter)' 
                      className='w-full outline-none text-gray-700 placeholder-gray-400'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                  />
                  <button 
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='text-gray-500 ml-2 flex-shrink-0'
                  >
                      {showPassword ? <FaEyeSlash className='cursor-pointer'/> : <FaEye className='cursor-pointer'/>}
                  </button>
              </div>
              
              {/* Role Selection */}
              <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                  <FaUserTag className='text-gray-500 mr-3 flex-shrink-0'/>
                  <select 
                      className='w-full outline-none text-gray-700 bg-white appearance-none' value={role} onChange={(e) => setRole(e.target.value)}
                      required
                  >
                      <option value="">Pilih Role</option>
                      <option value="Murid">Murid</option>
                      <option value="Guru">Guru</option>
                      <option value="Admin">Admin</option>
                  </select>
              </div>

              {/* Remember Me Checkbox */}
              <div className='flex items-center justify-between text-sm'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className='h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer'
                  />
                  Ingatkan saya
                </label>
              </div>
              
              {/* Submit Button */}
              <button 
                  type="submit"
                  className='w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md cursor-pointer'
              >
                Login
              </button>
              
              {/* Links Section */}
              <div className='flex justify-between items-center pt-4 text-sm'>
                  <Link 
                      to="/register" 
                      className='text-sky-600 hover:text-sky-800 flex items-center'
                  >
                      <FaSignInAlt className='mr-1'/>
                      Buat Akun Baru
                  </Link>
                  <Link 
                      to="/forgot-password" 
                      className='text-gray-600 hover:text-gray-800 flex items-center'
                  >
                      <FaKey className='mr-1'/>
                      Lupa Password
                  </Link>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Login
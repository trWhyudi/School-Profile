import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaKey, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !answer) {
            setError("Mohon isi semua data dengan benar.");
            setError("");
            return;
        }
    }

    return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 py-8 px-4'>
        <div className='bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md'>
            <div className='text-center mb-8'>
                <h2 className='text-2xl md:text-3xl font-bold text-sky-600'>Lupa Password</h2>
                <p className='text-gray-600 mt-2'>Isi formulir berikut untuk membuat password baru</p>
            </div>

            {error && (
                <p className="text-red-500 text-center text-sm mb-4">{error}</p>
            )}
            
            <form className='space-y-4' onSubmit={handleSubmit}>
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

                {/* Answer Field */}
                <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                    <FaUser className='text-gray-500 mr-3 flex-shrink-0'/>
                    <input 
                        type="text" 
                        placeholder='Masukan Nickname Anda' 
                        className='w-full outline-none text-gray-700 placeholder-gray-400'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </div>
                
                {/* Password Field */}
                <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                    <FaLock className='text-gray-500 mr-3 flex-shrink-0'/>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder='Password Baru (Minimal 6 Karakter)' 
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
                
                {/* Submit Button */}
                <button 
                    type="submit"
                    className='w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md cursor-pointer'
                >
                    Submit
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
                        to="/login" 
                        className='text-gray-600 hover:text-gray-800 flex items-center'
                    >
                        <FaKey className='mr-1'/>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    </div>
    )
}

export default ForgotPassword
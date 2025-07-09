import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUpload, FaUserTag, FaUser, FaMapMarkerAlt, FaBirthdayCake, FaSignInAlt, FaKey, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [role, setRole] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !phone || !address || !gender || !avatar || !dateOfBirth || !role) {
            toast.error("Mohon isi semua data dengan benar.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error("Password harus memiliki minimal 6 karakter.");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("gender", gender);
            formData.append("avatar", avatar);
            formData.append("dateOfBirth", dateOfBirth);
            formData.append("role", role);

            const {data} = await axios.post("http://localhost:5050/api/v1/user/create-user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success(data.message || "Registrasi berhasil");
            navigate("/login");

            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setAddress("");
            setGender("");
            setAvatar(null);
            setDateOfBirth("");
            setRole("");
        } catch (error) {
            console.error("Registrasi gagal",error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Registrasi gagal, silahkan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match("image/*")) {
                toast.error("File harus berupa gambar.");
                return;
            }
            setAvatar(file);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 py-8 px-4'>
            <div className='bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h2 className='text-2xl md:text-3xl font-bold text-sky-600'>Buat Akun Baru</h2>
                    <p className='text-gray-600 mt-2'>Isi formulir berikut untuk mendaftar</p>
                </div>
                
                <form className='space-y-4' onSubmit={handleRegistration}>
                    {/* Name Field */}
                    <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                        <FaUser className='text-gray-500 mr-3 flex-shrink-0'/>
                        <input 
                            type="text" 
                            placeholder='Nama Lengkap' 
                            className='w-full outline-none text-gray-700 placeholder-gray-400'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
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
                    
                    {/* Gender Selection */}
                    <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                        <FaUserTag className='text-gray-500 mr-3 flex-shrink-0'/>
                        <select 
                            className='w-full outline-none text-gray-700 bg-white appearance-none' 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Pilih Gender</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    
                    {/* Telephone Field */}
                    <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                        <FaPhone className='text-gray-500 mr-3 flex-shrink-0'/>
                        <input 
                            type="tel" 
                            placeholder='Nomor Telepon' 
                            className='w-full outline-none text-gray-700 placeholder-gray-400'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    {/* Address Field */}
                    <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                        <FaMapMarkerAlt className='text-gray-500 mr-3 flex-shrink-0'/>
                        <input 
                            type="text" 
                            placeholder='Alamat' 
                            className='w-full outline-none text-gray-700 placeholder-gray-400'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Birth Date Field */}
                    <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                        <FaBirthdayCake className='text-gray-500 mr-3 flex-shrink-0'/>
                        <input 
                            type="date" 
                            className='w-full outline-none text-gray-700 bg-white'
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Profile Picture Upload */}
                    <div className='border border-gray-300 rounded-lg px-3 py-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'>
                        <label className='flex items-center cursor-pointer'>
                            <FaUpload className='text-gray-500 mr-3 flex-shrink-0'/>
                            <input 
                                type="file" 
                                accept='image/*'
                                className='w-full outline-none text-gray-700'
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className='w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md cursor-pointer'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    
                    {/* Links Section */}
                    <div className='flex justify-between items-center pt-4 text-sm'>
                        <Link 
                            to="/login" 
                            className='text-sky-600 hover:text-sky-800 flex items-center'
                        >
                            <FaSignInAlt className='mr-1'/>
                            Sudah punya akun? Login
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

export default Register
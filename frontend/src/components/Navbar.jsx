import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { MdLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuth, setIsAuth, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  // Efek untuk menutup menu saat navigasi
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  // Efek untuk menangani scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {name: "Beranda", href:"/"},
    {name: "Tentang", href:"/about"},
    {name: "Layanan", href:"/services"},
    {name: "Kontak", href:"/contact"},
  ];

  const logOutHandler = async () => {
    try {
      let logoutUrl = "";
      let tokenName = "";

      if (user?.role === "Murid") {
        logoutUrl = "http://localhost:5050/api/v1/student/logOut-student";
        tokenName = "studentToken";
      } else if (user?.role === "Guru") {
        logoutUrl = "http://localhost:5050/api/v1/teacher/logOut-teacher";
        tokenName = "teacherToken";
      } else if (user?.role === "Admin") {
        logoutUrl = "http://localhost:5050/api/v1/user/logOut-admin";
        tokenName = "adminToken";
      }

      const res = await axios.get(logoutUrl, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });

      setIsAuth(false);
      setUser({});
      localStorage.removeItem(tokenName);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
      if (error.response?.status === 401) {
        setIsAuth(false);
        setUser({});
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.message || "Logout Gagal, silahkan coba lagi.");
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <header className={`bg-white shadow-md fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
          <div className='flex items-center'>
            <button 
              className='md:hidden mr-4 text-2xl text-gray-700'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className='text-2xl font-bold text-sky-600'>SMAN 1 Cibitung</Link>
          </div>
          
          <nav className='hidden md:flex space-x-6 text-lg'>
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.href} 
                className={`text-gray-700 hover:text-sky-600 transition duration-200 font-medium cursor-pointer ${
                  location.pathname === link.href ? 'text-sky-600 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className='flex items-center space-x-4'>
            {isAuth ? (
              <div className='relative'>
                <button 
                  onClick={() => setProfileOpen(!profileOpen)} 
                  className='flex items-center gap-2 focus:outline-none'
                >
                  {user?.avatar?.url ? (
                    <img 
                      src={user.avatar.url} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full object-cover border border-sky-300" 
                    />
                  ) : (
                    <FaUserCircle className='text-3xl text-sky-600'/>
                  )}
                </button>

                {profileOpen && (
                  <div className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 z-50 border border-gray-100'>
                    <div className='px-4 py-2 border-b border-gray-100'>
                      <p className='font-medium text-gray-800'>{user?.name}</p>
                      <p className='text-sm text-gray-500'>{user?.role}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className='block px-4 py-2 text-gray-700 hover:bg-sky-50 flex items-center gap-2' 
                      onClick={() => setProfileOpen(false)}
                    >
                      <RxDashboard /> Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className='block px-4 py-2 text-gray-700 hover:bg-sky-50 flex items-center gap-2' 
                      onClick={() => setProfileOpen(false)}
                    >
                      <FaUserCircle className="text-sm" /> Profil Saya
                    </Link>
                    <button 
                      className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1' 
                      onClick={() => {
                        setProfileOpen(false);
                        logOutHandler();
                      }}
                    >
                      <MdLogout /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='hidden md:flex space-x-3'>
                <Link 
                  to="/register" 
                  className='border border-sky-600 text-sky-600 px-4 py-2 rounded-md hover:bg-sky-50 transition duration-200'
                >
                  Daftar
                </Link>
                <Link 
                  to="/login" 
                  className='bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition duration-200'
                >
                  Masuk
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            {menuOpen && (
              <div className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 mt-16' onClick={() => setMenuOpen(false)}>
                <div 
                  className='bg-white w-3/4 h-full p-4 shadow-lg' 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='flex flex-col space-y-4'>
                    {navLinks.map((link, index) => (
                      <Link 
                        key={index}
                        to={link.href} 
                        className={`block py-2 px-3 rounded-md ${
                          location.pathname === link.href 
                            ? 'bg-sky-100 text-sky-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    {isAuth ? (
                      <>
                        <Link 
                          to="/dashboard" 
                          className='block py-2 px-3 rounded-md bg-sky-600 text-white text-center hover:bg-sky-700'
                          onClick={() => setMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button 
                          className='block py-2 px-3 rounded-md bg-red-600 text-white text-center hover:bg-red-700' 
                          onClick={() => {
                            setMenuOpen(false);
                            logOutHandler();
                          }}
                        >
                          Keluar
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/register" 
                          className='block py-2 px-3 rounded-md border border-sky-600 text-sky-600 text-center hover:bg-sky-50'
                          onClick={() => setMenuOpen(false)}
                        >
                          Daftar
                        </Link>
                        <Link 
                          to="/login" 
                          className='block py-2 px-3 rounded-md bg-sky-600 text-white text-center hover:bg-sky-700'
                          onClick={() => setMenuOpen(false)}
                        >
                          Masuk
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar;
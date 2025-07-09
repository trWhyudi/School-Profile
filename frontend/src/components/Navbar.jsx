import axios from 'axios';
import React, { useState, useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuth, setIsAuth, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const navLinks = [
    {name: "Beranda", href:"/"},
    {name: "Tentang", href:"/about"},
    {name: "Kontak", href:"/contact"},
    {name: "Layanan", href:"/services"},
    {name: "Kebijakan Privasi", href:"/policy"},
  ];

  const logOutHandler = async () => {
    try {
      let logoutUrl = "";
      let tokenName = "";

      if (user?.role === "Murid") {
        logoutUrl("http://localhost:5050/api/v1/student/logOut-student");
        tokenName("studentToken");
      } else if (user?.role === "Guru") {
        logoutUrl("http://localhost:5050/api/v1/teacher/logOut-teacher");
        tokenName("teacherToken");
      } else if (user?.role === "Admin") {
        logoutUrl("http://localhost:5050/api/v1/user/logOut-admin");
        tokenName("adminToken");
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
      <header className='bg-white shadow-md fixed w-full top-0 z-50'>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
          <Link to="/" className='text-2xl font-bold text-cyan-600'>SMAN 1 Cibitung</Link>
          <nav className='hidden md:flex space-x-6 text-lg'>
            {navLinks.map((link) => (
              <Link to={link.href} className='text-gray-700 hover:text-cyan-600 transition duration-200 font-medium cursor-pointer'>{link.name}</Link>
            ))}
          </nav>
          <div>
            {isAuth ? (
              <div>
                <button>{user?.avatar?.url?(
                  <img src={user.avatar.url} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-gray-300" />
                ) : (<FaUserCircle className='text-3xl text-gray-600'/>)}</button>
                {profileOpen && (
                  <div>
                    <Link to="/dashboard" className='block px-4 py-2 text-gray-700 hover:bg-sky-200' onClick={()=>setProfileOpen(false)}>Dashboard</Link>
                    <button className='w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 text-white' onClick={() => {setProfileOpen(false);
                      logOutHandler();}}>Login</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className='bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition duration-200'>Login</Link>
            )}
            <button>
              {menuOpen && (
                <div className='md:hidden text-2xl text-gray-700' onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
              )}

              {menuOpen && (
                <div className='md:hidden bg-white px-4 shadow-md space-y-4'>
                  {navLinks.map((link) => (
                    <Link key={link.name} to={link.href} className='block text-gray-700 hover:text-sky-600 font-medium' onClick={() => setMenuOpen(false)}>
                      {link.name}
                    </Link>
                  ))}
                  {
                    isAuth?(
                      <>
                        <Link to="/dashboard" className='block text-white text-center py-2 rounded-md'>Dashboard</Link>
                        <button className='block bg-red-600 text-white text-center w-full py-2 rounded-md' onClick={() => {setMenuOpen(false);
                          logOutHandler();}}>Logout</button>
                      </>
                    ) : (
                      <Link to={"/login"} className='block bg-sky-600 text-white text-center py-2 rounded-md' onClick={() => setMenuOpen(false)}>Login</Link>
                    )
                  }
                </div>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
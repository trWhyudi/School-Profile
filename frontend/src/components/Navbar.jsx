import axios from "axios";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuth, setIsAuth, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Cek apakah sedang di halaman dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }

      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        if (
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target)
        ) {
          setMenuOpen(false);
        }
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Menu untuk halaman biasa
  const regularNavLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Layanan", href: "/services" },
    { name: "Kontak", href: "/contact" },
  ];

  // Menu untuk halaman dashboard
  const dashboardNavLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profil", href: "/profile" },
    { name: "Beranda", href: "/" },
  ];

  const navLinks = isDashboard ? dashboardNavLinks : regularNavLinks;

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
        },
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
        toast.error(
          error?.response?.data?.message || "Logout Gagal, silahkan coba lagi."
        );
        navigate("/login");
      }
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-md py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              ref={menuButtonRef}
              className="md:hidden mr-4 text-2xl text-sky-600 hover:text-sky-800 transition-colors z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <img src="images/logo.png" alt="" className="w-10 h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                SMAN 1 Cibitung
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  location.pathname === link.href
                    ? "text-sky-600 bg-sky-50"
                    : "text-gray-700 hover:text-sky-600"
                }`}
              >
                {link.name}
                {location.pathname === link.href && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-sky-600 rounded-full"></span>
                )}
                <span className="absolute inset-0 rounded-lg bg-sky-100 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-transform duration-300 -z-10"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {isAuth ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full transition-all duration-300 hover:bg-sky-50"
                  aria-label="Profile menu"
                >
                  {user?.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-sky-200 hover:border-sky-300 transition-colors"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center border border-sky-200">
                      <FaUserCircle className="text-2xl text-sky-600" />
                    </div>
                  )}
                  <FaChevronDown
                    className={`text-sky-600 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 w-56 z-50 border border-gray-100 overflow-hidden animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-blue-50">
                      <p className="font-semibold text-gray-800 truncate">
                        {user?.name}
                      </p>
                      <p className="text-sm text-sky-600 capitalize">
                        {user?.role}
                      </p>
                    </div>

                    {!isDashboard && (
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-sky-50 transition-colors group"
                        onClick={() => setProfileOpen(false)}
                      >
                        <MdOutlineDashboard className="text-sky-600 group-hover:scale-110 transition-transform" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-sky-50 transition-colors group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <RiProfileLine className="text-sky-600 group-hover:scale-110 transition-transform" />
                      <span>Profil Saya</span>
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group"
                      onClick={() => {
                        setProfileOpen(false);
                        logOutHandler();
                      }}
                    >
                      <MdLogout className="group-hover:scale-110 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg border border-sky-600 text-sky-600 font-medium hover:bg-sky-600 hover:text-white transition-all duration-300"
                >
                  Daftar
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 text-white font-medium hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Masuk
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 transition-opacity duration-300"
          onClick={closeMenu}
        />

        <div
          className={`absolute top-0 left-0 h-full w-80 max-w-[85%] bg-white shadow-xl transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-blue-50">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <img src="images/logo.png" alt="" className="w-10 h-10" />
              <span className="text-xl font-bold text-sky-700">
                SMAN 1 Cibitung
              </span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-sky-100 transition-colors z-50 relative"
              aria-label="Close menu"
            >
              <FaTimes className="text-sky-700" />
            </button>
          </div>

          <div className="h-full overflow-y-auto py-6 px-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    location.pathname === link.href
                      ? "bg-sky-100 text-sky-600 shadow-inner"
                      : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <span className="ml-auto w-2 h-2 bg-sky-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              {isAuth ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-sky-50 rounded-xl mb-4">
                    <p className="font-medium text-sky-700">{user?.name}</p>
                    <p className="text-sm text-sky-600 capitalize">
                      {user?.role}
                    </p>
                  </div>

                  {!isDashboard && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-sky-50 transition-colors"
                      onClick={closeMenu}
                    >
                      <MdOutlineDashboard className="text-sky-600" />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-sky-50 transition-colors"
                    onClick={closeMenu}
                  >
                    <RiProfileLine className="text-sky-600" />
                    <span>Profil Saya</span>
                  </Link>

                  <button
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      closeMenu();
                      logOutHandler();
                    }}
                  >
                    <MdLogout />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/register"
                    className="px-4 py-3 text-center rounded-xl border border-sky-600 text-sky-600 font-medium hover:bg-sky-600 hover:text-white transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Daftar
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-3 text-center rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-medium hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                    onClick={closeMenu}
                  >
                    Masuk
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

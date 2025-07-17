import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaBookOpen, FaClipboardList, FaHome, FaListAlt, FaMoneyCheckAlt, FaSchool, FaSignOutAlt, FaUserCircle, FaUser, FaArrowAltCircleLeft, FaUserGraduate } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BsBookmarkCheckFill } from "react-icons/bs";
import axios from 'axios'

const Sidebar = ({ setComponents }) => {
    const [show, setShow] = useState(false)
    const { user, setIsAuth } = useContext(Context);
    const [activeMenu, setActiveMenu] = useState("Profil");
    const navigateTo = useNavigate();

    const handleLogOut = async (e) => {
        e.preventDefault();
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

            const { data } = await axios.get(logoutUrl, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
            });

            setIsAuth(false);
            localStorage.removeItem(tokenName);
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            toast.success(data.message, { autoClose: 3000 });
            navigateTo("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout Gagal, silahkan coba lagi.");
        }
    }

    const handleHomePage = () => {
        navigateTo("/");
    }

    const handleChangePage = (value) => {
        setComponents(value);
        setActiveMenu(value);
    }

    // Semua menu yang ada
    const allMenuItems = [
        {
        label: "Profil",
        icon: <FaUserCircle className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Murid",
        icon: <FaUser className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Guru",
        icon: <FaUserGraduate className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Nilai",
        icon: <BsBookmarkCheckFill className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Pembayaran",
        icon: <FaMoneyCheckAlt className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Kelas",
        icon: <FaSchool className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Pelajaran",
        icon: <FaBookOpen className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Presensi",
        icon: <FaListAlt className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Ujian",
        icon: <FaClipboardList className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "Beranda",
        icon: <FaHome className="text-xl" />,
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 text-indigo-700 hover:text-indigo-900",
        },
        {
        label: "LogOut",
        icon: <FaSignOutAlt className="text-xl" />,
        isLogout: true,
        color: "bg-gradient-to-r from-red-100 to-red-50 hover:from-red-200 hover:to-red-100 text-red-700 hover:text-red-900",
        },
    ];

    // Filter menu sesuai role user
    let menuItems = [];

    if (user?.role === "Admin") {
        menuItems = allMenuItems; // Semua menu untuk Admin
    } else {
        // Guru dan Murid hanya boleh lihat Profil, Beranda, LogOut
        menuItems = allMenuItems.filter(item =>
        ["Profil", "Beranda", "LogOut"].includes(item.label)
        );
    }

    return (
        <div>
        <div className='fixed top-5 left-5 mt-4 bg-white shadow-lg text-indigo-600 p-3 rounded-full flex items-center justify-center cursor-pointer z-30 lg:hidden hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-300' onClick={() => setShow(!show)}>
            <RxHamburgerMenu className='text-2xl' />
        </div>
        <aside className={`fixed xl:relative top-0 left-0 h-full lg:h-screen w-[250px] lg:w-72 bg-gradient-to-b from-white to-indigo-50 border-r border-indigo-100 shadow-xl flex flex-col transition-all duration-300 z-40 ${show ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}>
            <div className='absolute top-5 left-4 cursor-pointer xl:hidden bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300' onClick={() => setShow(!show)}>
            <FaArrowAltCircleLeft />
            </div>
            <div className='flex flex-col items-center mt-20 lg:mt-30'>
            <div className='relative'>
                <img src={user?.avatar?.url} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 shadow-md" />
                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
            </div>
            <p className='mt-4 text-lg font-semibold text-gray-800 uppercase tracking-wider'>{user?.name}</p>
            <p className='text-sm text-indigo-600 font-medium mt-1'>{user?.role}</p>
            </div>
            <div className='flex flex-col gap-3 mt-8 px-4 overflow-y-auto flex-1 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {menuItems.map(({ label, icon, color, isLogout }) => (
                <button
                key={label}
                onClick={isLogout ? handleLogOut : label === "Beranda" ? handleHomePage : () => handleChangePage(label)}
                className={`
                    flex items-center justify-between px-6 py-3 mt-0.5 rounded-xl text-lg font-medium transition-all duration-300 cursor-pointer
                    ${color}
                    ${activeMenu === label ? "ring-2 ring-indigo-400 bg-indigo-200 font-bold shadow-md" : ""}
                `}
                >
                <span>{label}</span>
                <span className='opacity-80 hover:opacity-100'>{icon}</span>
                </button>
            ))}
            </div>
            <div className='p-4 text-center text-xs text-gray-500'>
            © {new Date().getFullYear()} SMAN 1 Cibitung. <br />All rights reserved.
            </div>
        </aside>
        </div>
    )
}

export default Sidebar

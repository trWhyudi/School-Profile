import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaBook, FaBuilding } from 'react-icons/fa'

const AllTeacher = () => {
    const [teacher, setTeacher] = useState([]);

    const fetchTeacher = async () => {
        try {
            const {data} = await axios.get("http://localhost:5050/api/v1/teacher/get-all-teacher", {
                withCredentials: true
            });
            setTeacher(data.teachers);
        } catch (error) {
            toast.error(error.response?.data?.message || "Terjadi kesalahan");
        }
    }

    useEffect(() => {
        fetchTeacher();
    }, [])

    const settings = {
        dots: true,
        infinite: teacher.length > 1,
        speed: 500,
        slidesToShow: Math.min(3, teacher.length),
        slidesToScroll: 1,
        autoplay: teacher.length > 1,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 }
            }
        ]
    }

    return (
        <div className='bg-sky-50 py-20' data-aos="fade-up">
            <div className='max-w-[1440px] mx-auto px-4'>
                <h1 className='text-3xl md:text-4xl font-bold text-sky-600 mb-12 text-center' data-aos="fade-up">🎓 Kenali Guru Kami</h1>

                {teacher && teacher.length > 0 ? (
                    teacher.length === 1 ? (
                        <div className='flex justify-center'  data-aos="zoom-in">
                            <div className='max-w-md w-full'>
                                <div className='bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 duration-300'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <img 
                                            src={teacher[0]?.userId?.avatar?.url || '/default-avatar.png'} 
                                            alt="Avatar" 
                                            className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover" 
                                        />
                                        <div className='flex-1'>
                                            <h2 className='text-xl font-semibold text-gray-700'>{teacher[0]?.userId?.name || "Nama Guru"}</h2>
                                            <p className='text-sm text-gray-600 capitalize flex items-center gap-2'><FaBook className='text-sky-600'/> Mata Pelajaran: {teacher[0]?.subject}</p>
                                            <p className='text-sm text-gray-600 capitalize flex items-center gap-2'><FaBuilding className='text-sky-600'/> Jurusan: <span>{teacher[0]?.department}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {teacher.map((teacherItem) => (
                                <div key={teacherItem._id} className='px-4 cursor-pointer' data-aos="zoom-in">
                                    <div className='bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 duration-300'>
                                        <div className='flex items-center gap-4 mb-4'>
                                            <img 
                                                src={teacherItem?.userId?.avatar?.url || '/default-avatar.png'} 
                                                alt="Avatar" 
                                                className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover" 
                                            />
                                            <div className='flex-1'>
                                                <h2 className='text-xl md:text-2xl font-semibold text-gray-700'>{teacherItem?.userId?.name || "Nama Guru"}</h2>
                                                <p className='text-sm text-gray-600 flex items-center gap-2 md:text-md'><FaBook className='text-sky-600 '/> Mata Pelajaran: {teacherItem?.subject}</p>
                                                <p className='text-sm md:text-md text-gray-600 capitalize flex items-center gap-2'><FaBuilding className='text-sky-600'/> Jurusan: <span>{teacherItem?.department}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )
                ) : (
                    <p className='text-center text-lg text-red-600 mt-8'>🚫Tidak ada data guru</p>
                )}
            </div>
        </div>
    )
}

export default AllTeacher
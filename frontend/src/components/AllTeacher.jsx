import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { toast } from 'react-toastify'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const AllTeacher = () => {
    const [teacher, setTeacher] = useState([]);
    const {user} = useContext(Context);

    const fetchTeacher = async () => {
        try {
            const {data} = await axios.get("http://localhost:5050/api/v1/teacher/get-teacher", {
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
        <div className='bg-gradient-to-r from-sky-50 to-purple-200 py-10'>
            <div className='max-w-[1440px] mx-auto px-4'>
                <h1 className='text-4xl font-bold text-sky-600 mb-12'>🎓 Guru Terbaik</h1>

                {teacher && teacher.length > 0 ? (
                    teacher.length === 1 ? (
                        <div className='flex justify-center'>
                            <div className='max-w-md w-full'>
                                <div className='bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 duration-300'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <img 
                                            src={teacher[0]?.userId?.avatar?.url || '/default-avatar.png'} 
                                            alt="Avatar" 
                                            className="w-16 h-16 rounded-full border-2 border-indigo-400 object-cover" 
                                        />
                                        <div className='flex-1'>
                                            <h2 className='text-xl font-semibold text-indigo-700'>{teacher[0]?.userId?.name || "Nama Guru"}</h2>
                                            <p className='text-sm text-gray-600 capitalize'>Mata Pelajaran: {teacher[0]?.subject}</p>
                                            <p className='text-sm text-gray-600'>Jurusan: <span>{teacher[0]?.department}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {teacher.map((teacherItem) => (
                                <div key={teacherItem._id} className='px-4'>
                                    <div className='bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 duration-300'>
                                        <div className='flex items-center gap-4 mb-4'>
                                            <img 
                                                src={teacherItem?.userId?.avatar?.url || '/default-avatar.png'} 
                                                alt="Avatar" 
                                                className="w-16 h-16 rounded-full border-2 border-indigo-400 object-cover" 
                                            />
                                            <div className='flex-1'>
                                                <h2 className='text-xl font-semibold text-indigo-700'>{teacherItem?.userId?.name || "Nama Guru"}</h2>
                                                <p className='text-sm text-gray-600 capitalize'>Mata Pelajaran: {teacherItem?.subject}</p>
                                                <p className='text-sm text-gray-600'>Jurusan: <span>{teacherItem?.department}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )
                ) : (
                    <p className='text-center text-lg text-red-600 mt-8'>Belum ada guru terbaik</p>
                )}
            </div>
        </div>
    )
}

export default AllTeacher
import React from 'react'
import { FaSchool, FaUserGraduate, FaBookOpen, FaFlask } from "react-icons/fa"
import { PiStudentFill } from "react-icons/pi";

const About = () => {
  const stats = [
    { icon: <PiStudentFill size={50} />, value: "500+", label: "Murid" },
    { icon: <FaUserGraduate size={50} />, value: "40+", label: "Guru" },
    { icon: <FaBookOpen size={50} />, value: "30+", label: "Mata Pelajaran" },
    { icon: <FaSchool size={50} />, value: "20+", label: "Kelas" },
    { icon: <FaFlask size={50} />, value: "5+", label: "Lab" }
  ];

  return (
    <div className="bg-sky-50 text-white pt-10">
      <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20'>
        {/* Hero Section */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24'>
          <div className='md:w-1/2 space-y-6'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-sky-600'>
              Tentang <span className='text-gray-800'>Kami</span>
            </h1>
            <p className='text-lg sm:text-xl text-gray-600 leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem illo repudiandae aperiam laudantium dolor in dolores saepe recusandae veniam qui.
            </p>
            <p className='text-lg sm:text-xl text-gray-600 leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem illo repudiandae aperiam laudantium dolor in dolores saepe recusandae veniam qui.
            </p>
          </div>
          <div className='md:w-1/2'>
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Sekolah kami" 
              className='rounded-lg shadow-xl w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]'
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center'
            >
              <div className='bg-sky-100 p-4 rounded-full text-sky-600 mb-4'>
                {stat.icon}
              </div>
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>{stat.value}</h2>
              <p className='text-lg font-medium text-gray-600'>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Additional Content (optional) */}
        <div className='mt-24 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6'>Visi dan Misi Kami</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-xl font-semibold mb-4'>Visi</h3>
              <p className='text-lg opacity-90'>
                Menjadi institusi pendidikan unggulan yang menghasilkan generasi berkarakter, berkompeten, dan berdaya saing global.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-4'>Misi</h3>
              <ul className='space-y-3 text-lg opacity-90'>
                <li className='flex items-start'>
                  <span className='mr-2'>•</span>
                  <span>Menyelenggarakan pendidikan berkualitas</span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2'>•</span>
                  <span>Mengembangkan potensi peserta didik secara holistik</span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2'>•</span>
                  <span>Membentuk karakter yang kuat dan berakhlak mulia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
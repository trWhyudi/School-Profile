import React from 'react'
import { FaUserShield, FaDatabase, FaLock, FaUserSecret, FaUserEdit } from "react-icons/fa";

const policies = [
  {
    icon: <FaDatabase className="text-blue-600 text-2xl"/>,
    title: "Informasi yang Kami Kumpulkan",
    description: "Kami mengumpulkan informasi pribadi seperti nama, email, dan data penggunaan saat Anda menggunakan layanan kami."
  },
  {
    icon: <FaUserShield className="text-blue-600 text-2xl"/>,
    title: "Penggunaan Informasi",
    description: "Informasi digunakan untuk pengelolaan layanan, komunikasi, dan peningkatan performa."
  },
  {
    icon: <FaLock className="text-blue-600 text-2xl"/>,
    title: "Perlindungan Data",
    description: "Kami menggunakan langkah keamanan wajar untuk menjaga data Anda, tetapi tidak dapat menjamin 100% keamanan."
  },
  {
    icon: <FaUserSecret className="text-blue-600 text-2xl"/>,
    title: "Pihak Ketiga",
    description: "Data Anda tidak akan dibagikan kepada pihak ketiga tanpa izin, kecuali diwajibkan oleh hukum."
  },
  {
    icon: <FaUserEdit className="text-blue-600 text-2xl"/>,
    title: "Hak Pengguna",
    description: "Anda dapat meminta akses, perubahan, atau penghapusan data pribadi dengan menghubungi kami."
  },
]

const Policy = () => {
  return (
    <div className='min-h-screen bg-sky-50 pt-20 pb-16 px-6'>
      <section className='max-w-[1440px] mx-auto py-8'>
        <div>
          <h2 className='text-3xl md:text-4xl font-bold text-sky-600 mb-4 text-center'>Kebijakan Privasi</h2>
          <p className='text-gray-600 text-center mb-12 text-md md:text-lg font-normal cursor-pointer'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, vitae!
          </p>
          <div className='space-y-12'>
            {policies.map((item, index) => (
              <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition hover:scale-95 cursor-pointer duration-300 hover:bg-gray-300'>
                <div>{item.icon}</div>
                <div>
                  <h3 className='text-lg md:text-xl py-1 font-semibold text-gray-800 cursor-pointer'>{item.title}</h3>
                  <p className='text-gray-600 text-sm mt-1 md:text-lg cursor-pointer'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Policy
import React from 'react'
import { FaCheckCircle, FaGlobe, FaShieldAlt, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa";

const terms = [
  {
    icon: <FaCheckCircle className="text-sky-600 text-2xl"/>,
    title: "Penerimaan Syarat",
    description: "Dengan menggunakan situs ini, Anda menyetujui syarat dan ketentuan yang berlaku. Jika tidak setuju, harap tidak menggunakan layanan kami."
  },
  {
    icon: <FaGlobe className="text-sky-600 text-2xl"/>,
    title: "Penggunaan Layanan",
    description: "Gunakan layanan ini hanya untuk tujuan yang sah. Dilarang menyalahgunakan sistem atau melakukan aktivitas ilegal."
  },
  {
    icon: <FaShieldAlt className="text-sky-600 text-2xl"/>,
    title: "Hak Kekayaan Intelektual",
    description: "Semua konten di situs ini dilindungi hak cipta dan tidak boleh digunakan tanpa izin."
  },
  {
    icon: <FaExclamationTriangle className="text-sky-600 text-2xl"/>,
    title: "Penolakan Jaminan",
    description: 'Layanan kami diberikan "sebagaimana adanya". Kami tidak menjamin bebas dari kesalahan atau gangguan.'
  },
  {
    icon: <FaSyncAlt className="text-sky-600 text-2xl"/>,
    title: "Perubahan Syarat",
    description: "Syarat ini dapat diperbarui sewaktu-waktu. Silakan tinjau secara berkala untuk mengetahui perubahan terbaru."
  },
]

const Terms = () => {
  return (
    <div className='bg-sky-50 pt-20 pb-16 px-6'>
      <div className='max-w-[1440px] mx-auto py-8' data-aos="fade-in">
        <h2 className='text-3xl md:text-4xl font-bold text-sky-600 mb-4 text-center'>Syarat dan Ketentuan</h2>
        <p className='text-gray-600 text-center mb-12 font-sans'>Harap membaca dengan seksama syarat dan ketentuan berikut sebelum menggunakan layanan atau mendaftar di SMAN 1 Cibitung. <br /> Dengan melanjutkan, Anda menyetujui semua ketentuan yang berlaku.</p>
        <div className='space-y-10 cursor-pointer'>
          {terms.map((item, index)=>(
            <div key={index} className='flex flex-col sm:flex-row text-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition hover:bg-gray-300 cursor-pointer duration-300'>
              <div>{item.icon}</div>
              <div>
                <h3 className='text-lg md:text-xl cursor-pointer font-semibold text-gray-800'>{item.title}</h3>
                <p className='text-gray-600 text-md md:text-lg font-normal mt-1'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className='text-md text-gray-500 text-center mt-8'>Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui email: <strong>sman1cibitung@gmail.com</strong></p>
      </div>
    </div>
  )
}

export default Terms
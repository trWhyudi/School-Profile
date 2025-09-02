import React from 'react'

const services = [
  {
    title: "Perpustakaan Sekolah",
    description: "Tempat menyimpan banyak buku dan bahan belajar yang bisa dipakai siswa untuk belajar dan membaca.",
    icon: "📖"
  },
  {
    title: "UKS (Usaha Kesehatan Sekolah)",
    description: "Tempat istirahat siswa yang sakit. Di sini juga ada pemeriksaan kesehatan dan belajar cara hidup sehat.",
    icon: "🏥"
  },
  {
    title: "Laboratorium Komputer",
    description: "Ruang belajar komputer untuk belajar mengetik, membuat tugas, dan menggunakan internet.",
    icon: "🖥️"
  },
  {
    title: "Kantin Sekolah",
    description: "Tempat membeli makanan dan minuman yang bersih dan sehat untuk siswa.",
    icon: "🍽️"
  },
  {
    title: "Lapangan Olahraga",
    description: "Tempat luas untuk bermain dan berolahraga seperti sepak bola, basket, dan senam.",
    icon: "⚽"
  }
]

const Services = () => {
  return (
    <div className='pt-20 pb-16 px-6 bg-sky-50'>
      <div className='max-w-[1440px] mx-auto py-5' data-aos="fade-up">
        <h2 className='text-3xl md:text-4xl font-bold text-center text-sky-600 mb-4'>Layanan <span className='text-gray-800'>Kami</span></h2>
        <p className='text-center text-gray-600 mb-12 max-w-2xl mx-auto md:text-lg text-md'>
          SMAN 1 Cibitung menyediakan berbagai layanan untuk mendukung proses belajar mengajar secara optimal. Semua layanan dirancang untuk menunjang perkembangan akademik, karakter, dan minat bakat siswa.
        </p>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, index)=>(
            <div key={index} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105 duration-300' data-aos="zoom-in">
              <div className='text-4xl mb-4'>{service.icon}</div>
              <h3 className='text-xl font-semibold text-sky-600 mb-2'>{service.title}</h3>
              <p className='text-gray-600 text-md md:text-lg'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
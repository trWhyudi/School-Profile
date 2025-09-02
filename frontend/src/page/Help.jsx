import React from 'react'
import { PiPhoneCallFill } from "react-icons/pi";

const Help = () => {
  return (
    <div>
      <div className='bg-sky-50'>
        <div className='px-4 py-8 mt-16 md:px-8 lg:px-16 max-w-[1440px] mx-auto'>
          <h1 className='text-3xl sm:text-4xl font-bold text-center mb-10 text-sky-600'>Pusat Bantuan</h1>
          <section className='mb-12'>
            <h1 className='text-xl sm:text-2xl font-semibold mb-4 text-gray-800'>Informasi Umum</h1>
            <p className='text-gray-600 text-sm sm:text-base md:text-lg font-sans'>Sekolah SMAN 1 Cibitung adalah institusi pendidikan yang berlokasi di Cibitung, Bekasi. Kami berkomitmen untuk memberikan pendidikan berkualitas, membentuk karakter siswa, dan menciptakan lingkungan belajar yang aman, nyaman, dan menyenangkan.</p>
          </section>
          <section className='mb-12'>
            <h2 className='text-xl sm:text-2xl font-semibold mb-6 text-gray-800'>Pertanyaan Umum</h2>
            <div className='space-y-6'>
              <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition hover:bg-gray-300 hover:duration-300 cursor-pointer'>
                <h3 className='font-semibold text-lg md:text-xl text-sky-600'>Bagaimana cara daftar ke sekolah ini?</h3>
                <p className='text-gray-600 text-sm md:text-lg mt-2 font-sans'>Pendaftaran dapat dilakukan secara online melalui menu Pendaftaran di website ini, atau datang langsung ke kantor sekolah pada jam kerja. Silakan bawa dokumen seperti akta kelahiran, kartu keluarga, dan ijazah terakhir.</p>
              </div>
              <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition hover:bg-gray-300 hover:duration-300 cursor-pointer'>
                <h3 className='font-semibold text-lg md:text-xl text-sky-600'>Kapan waktu pendaftaran dibuka?</h3>
                <p className='text-gray-600 text-sm md:text-lg mt-2 font-sans'>Pendaftaran biasanya dibuka pada bulan Mei hingga Juli setiap tahunnya. Informasi terbaru akan diumumkan di halaman Pengumuman atau Berita di website ini.</p>
              </div>
              <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition hover:bg-gray-300 hover:duration-300 cursor-pointer'>
                <h3 className='font-semibold text-lg md:text-xl text-sky-600'>Apakah sekolah menyediakan beasiswa atau keringanan biaya?</h3>
                <p className='text-gray-600 text-sm md:text-lg mt-2 font-sans'>Ya, sekolah kami menyediakan program beasiswa dan keringanan biaya untuk siswa yang memenuhi kriteria tertentu. Silakan hubungi bagian administrasi atau lihat menu Beasiswa untuk informasi lengkap.</p>
              </div>
            </div>
          </section>
          <section className='mb-12'>
            <h2 className='text-xl sm:text-2xl font-semibold mb-4 text-gray-800'><PiPhoneCallFill className='inline-block mr-2 text-sky-700 text-3xl'/>Hubungi Kami</h2>
            <p className='text-gray-600 text-sm sm:text-base mb-4'>Jika Anda mengalami masalah, silakan hubungi kami.</p>
            <ul className='text-gray-700 text-sm sm:text-base mb-4'>
              <li>Email: <strong>sman1cibitung@gmail.com</strong></li>
              <li>Phone: <strong>+62 812 3456 7890</strong></li>
              <li>Waktu Buka: <strong>Senin-Jumat, 07:00 - 16:00</strong></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Help


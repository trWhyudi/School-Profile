import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaYoutube } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className='bg-gray-900 text-white pt-16 pb-8 px-6'>
        <div className='max-w-[1440px] mx-auto grid md:grid-cols-4 gap-10 md:gap-8 lg:gap-16 mb-8'>
          <div className=''>
            <h2 className='text-2xl md:text-3xl font-bold text-sky-500'>SMAN 1 Cibitung</h2>
            <p className='text-gray-300 text-lg font-sans mt-2'>SMAN 1 Cibitung – Sekolah menengah di Bekasi yang menghadirkan pendidikan berkualitas dan lingkungan belajar yang mendukung.</p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-3 md:text-xl font-sans text-sky-500'>Tautan Cepat</h3>
            <ul className='space-y-3 text-gray-300 text-sm md:text-lg'>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/"}>Beranda</Link>
              </li>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/about"}>Tentang Kami</Link>
              </li>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/services"}>Layanan</Link>
              </li>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/contact"}>Kontak</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-3 md:text-xl font-sans text-sky-500'>Support</h3>
            <ul className='space-y-3 text-gray-300 text-sm md:text-lg'>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/faq"}>FAQ</Link>
              </li>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/policy"}>Kebijakan Privasi</Link>
              </li>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/terms"}>Syarat dan Ketentuan</Link>
              </li>
              <li className='hover:text-sky-500 cursor-pointer'>
                <Link to={"/help"}>Pusat Bantuan</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-3 text-sky-500'>Ikuti Kami</h3>
            <div className='flex gap-4 cursor-pointer items-center'>
              <Link to={"http://instagram.com/officialsmanci_/"}>
                <FaInstagram size={22} className='hover:text-pink-600'/>
              </Link>
              <Link to={"https://www.facebook.com/sman1cibitung"}>
                <FaFacebookSquare size={22} className='hover:text-blue-600'/>
              </Link>
              <Link to={""}>
                <FaYoutube size={22} className='hover:text-red-600'/>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
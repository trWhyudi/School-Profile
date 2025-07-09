import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-sky-700">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
        Halaman Tidak Ditemukan
      </p>
      <p className="text-gray-600 mt-2">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-sky-700 text-white font-semibold rounded-md shadow-md hover:bg-sky-800 transition duration-300"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}

export default PageNotFound
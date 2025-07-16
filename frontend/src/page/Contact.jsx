import React from 'react'

const Contact = () => {
  return (
    <div>
      <div className='bg-sky-50 text-gray-800 px-6 py-16 min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-[1140px] bg-white rounded-lg shadow-lg p-10 grid md:grid-cols-2 gap-12'>
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-sky-600'>Kontak <span className='text-gray-800'>Kami</span></h2>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quidem?</p>
            <div>
              <h4 className='font-semibold'>Alamat Sekolah</h4>
              <p className='text-gray-600'>Cibitung, Bekasi</p>
            </div>
            <div>
              <h4 className='font-semibold'>Email</h4>
              <p className='text-gray-600'>info@gmail.com</p>
            </div>
            <div>
              <h4 className='font-semibold'>No. Telepon</h4>
              <p className='text-gray-600'>+62 8123 4567 890</p>
            </div>
            <div>
              <h4 className='font-semibold'>Waktu Buka</h4>
              <p className='text-gray-600'>Senin-Jumat : 09.00 - 17.00</p>
            </div>
          </div>
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold'>Kirim pesan disini</h3>
            <input type="text" placeholder='Nama' className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500'/>
            <input type="email" placeholder='Email' className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500'/>
            <textarea placeholder='Pesan' className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500'></textarea>
            <button className='w-full bg-sky-600 text-white py-2 rounded font-semibold hover:bg-sky-500 cursor-pointer'>Kirim</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
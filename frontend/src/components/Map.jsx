import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDirections, FaPhone, FaClock } from 'react-icons/fa';

const Map = () => {
  return (
    <div className='bg-gradient-to-r from-sky-50 to-indigo-200 py-16 px-4 sm:px-6 lg:px-8' data-aos="fade-up">
      <div className='max-w-[1440px] mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-gray-800'>
            <span className='block text-sky-600'>Lokasi Kami</span>
            <span className='block'>SMAN 1 Cibitung</span>
          </h2>
          <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
            Kunjungi sekolah kami atau hubungi untuk informasi lebih lanjut
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Information Card */}
          <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between'>
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>Informasi Kontak</h3>
              
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <FaMapMarkerAlt className='flex-shrink-0 h-6 w-6 text-sky-600 mt-1' />
                  <div className='ml-3'>
                    <p className='text-base font-medium text-gray-900'>Alamat</p>
                    <p className='text-base text-gray-500'>
                      Jl. Raya Cibitung No.123, Bekasi, Jawa Barat 17520
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <FaPhone className='flex-shrink-0 h-6 w-6 text-sky-600 mt-1' />
                  <div className='ml-3'>
                    <p className='text-base font-medium text-gray-900'>Telepon</p>
                    <p className='text-base text-gray-500'>+62 812 3456 7890</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <FaClock className='flex-shrink-0 h-6 w-6 text-sky-600 mt-1' />
                  <div className='ml-3'>
                    <p className='text-base font-medium text-gray-900'>Jam Operasional</p>
                    <p className='text-base text-gray-500'>
                      Senin-Jumat: 07:00 - 16:00 WIB<br />
                      Sabtu: 07:00 - 15:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <a
                href="https://maps.google.com?daddr=SMA+Negeri+1+Cibitung"
                target="_blank"
                rel="noopener noreferrer"
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 transition duration-200'
              >
                <FaDirections className='mr-2' /> Dapatkan Petunjuk Arah
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className='lg:col-span-2'>
            <div className='relative h-full rounded-xl overflow-hidden shadow-lg border border-gray-200'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26835.228132686254!2d107.09739934757668!3d-6.263401966440017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698f86b4eccc3b%3A0xced880efce461859!2sSMA%20Negeri%201%20Cibitung!5e0!3m2!1sid!2sid!4v1752076604091!5m2!1sid!2sid"
                className='w-full h-full min-h-[400px]'
                title='Google Map SMAN 1 Cibitung'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              {/* Watermark */}
              <div className='absolute bottom-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600'>
                <Link to="https://maps.google.com" target="_blank" className='hover:text-sky-600'>
                  Lihat di Google Maps
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
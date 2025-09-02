import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SERVICE_ID = 'service_he6zcgr';
  const TEMPLATE_ID = 'template_r1fxhgr';
  const PUBLIC_KEY = 'YYTcE1N98YUqvZYWd';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Kirim email menggunakan EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'triwahyudi5321@gmail.com' // Email admin tujuan
        },
        PUBLIC_KEY
      );

      // Notifikasi sukses
      toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className='bg-sky-50 text-gray-800 px-6 py-16 min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-[1140px] bg-white rounded-lg shadow-lg p-10 grid md:grid-cols-2 gap-12' data-aos="fade-in">
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-sky-600'>Kontak <span className='text-gray-800'>Kami</span></h2>
            <p className='text-gray-600'>Untuk informasi lebih lanjut mengenai pendaftaran, program pendidikan, atau kerja sama, silakan hubungi kami melalui kontak berikut.</p>
            <div>
              <h4 className='font-semibold'>Alamat Sekolah</h4>
              <p className='text-gray-600'>Jl. Raya Cibitung No.123, Bekasi, Jawa Barat 17520</p>
            </div>
            <div>
              <h4 className='font-semibold'>Email</h4>
              <p className='text-gray-600'>sman1cibitung@gmail.com</p>
            </div>
            <div>
              <h4 className='font-semibold'>No. Telepon</h4>
              <p className='text-gray-600'>+62 812 3456 7890</p>
            </div>
            <div>
              <h4 className='font-semibold'>Waktu Buka</h4>
              <p className='text-gray-600'>Senin-Jumat : 07.00 - 16.00</p>
              <p className='text-gray-600'>Sabtu : 07.00 - 15.00</p>
            </div>
          </div>
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold'>Kirim pesan disini</h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <input 
                type="text" 
                name="name"
                placeholder='Nama' 
                className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder='Email' 
                className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input 
                type="text" 
                name="subject"
                placeholder='Subjek' 
                className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea 
                name="message"
                placeholder='Pesan' 
                className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]'
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button 
                type="submit"
                className={`w-full bg-sky-600 text-white py-2 rounded font-semibold hover:bg-sky-500 cursor-pointer ${isSubmitting ? 'opacity-70' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Contact;
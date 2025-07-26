import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const D_News = () => {
  const [newsList, setNewsList] = useState([])
  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    image: null,
    imagePreview: '',
  })
  const [updateId, setUpdateId] = useState(null)

  const fetchNews = async () => {
    try {
      const { data } = await axios.get('http://localhost:5050/api/v1/news/get-all-news', {
        withCredentials: true,
      })
      setNewsList(data.news || [])
    } catch (error) {
      toast.error('Gagal mengambil data berita')
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            const file = files[0]
            setNewsData((prev) => ({
            ...prev,
            image: file,
            imagePreview: file ? URL.createObjectURL(file) : prev.imagePreview,
            }))
        } else {
            setNewsData((prev) => ({
            ...prev,
            [name]: value,
            }))
        }
    }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', newsData.title)
    formData.append('content', newsData.content)
    if (newsData.image) {
      formData.append('image', newsData.image)
    }

    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/news/update-news/${updateId}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        toast.success('Berita berhasil diperbarui')
      } else {
        await axios.post('http://localhost:5050/api/v1/news/create-news', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        toast.success('Berita berhasil ditambahkan')
      }

      setNewsData({ title: '', content: '', image: null })
      setUpdateId(null)
      fetchNews()
    } catch (err) {
      toast.error('Gagal menyimpan berita')
    }
  }

  const handleEdit = (news) => {
    setNewsData({
      title: news.title,
      content: news.content,
      image: null,
      imagePreview: news.image?.url || '',
    })
    setUpdateId(news._id)
  }

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
    })

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/news/delete-news/${id}`, {
          withCredentials: true,
        })
        toast.success('Berita berhasil dihapus')
        fetchNews()
      } catch (error) {
        toast.error('Gagal menghapus berita')
      }
    }
  }

  return (
    <div className='py-10 px-4 max-w-6xl mx-auto'>
      {/* FORM */}
      <div className='bg-white rounded-xl shadow-md p-6 mb-10'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Form Berita
        </h2>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Judul Berita</label>
            <input
              type='text'
              name='title'
              value={newsData.title}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required
            />
          </div>

          <div className='space-y-2 md:col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>Isi Berita</label>
            <textarea
              name='content'
              value={newsData.content}
              onChange={handleChange}
              rows={4}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none'
              required
            ></textarea>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Gambar</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required={!updateId}
            />
            {newsData.imagePreview && (
                <img
                src={newsData.imagePreview}
                alt="Preview"
                className="mt-2 h-24 w-36 object-cover rounded-md border"
                />
            )}
          </div>

          <div className='md:col-span-2 flex flex-col sm:flex-row gap-4'>
            <button
              type='submit'
              className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer'
            >
              {updateId ? 'Update Berita' : 'Simpan Berita'}
            </button>
            {updateId && (
              <button
                type='button'
                onClick={() => {
                  setUpdateId(null)
                  setNewsData({ title: '', content: '', image: null })
                }}
                className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition duration-300 cursor-pointer'
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABEL BERITA */}
      <div className='bg-white rounded-xl shadow-md p-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Daftar Berita</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>No</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Judul</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Gambar</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Aksi</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {newsList.length > 0 ? (
                newsList.map((item, index) => (
                  <tr key={item._id} className='hover:bg-gray-50 transition'>
                    <td className='px-4 py-3 text-sm text-gray-500'>{index + 1}</td>
                    <td className='px-4 py-3 text-sm font-medium text-gray-900 max-w-xs truncate'>{item.title}</td>
                    <td className='px-4 py-3'>
                      <img src={item.image?.url} alt={item.title} className='h-12 w-20 object-cover rounded-md' />
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => handleEdit(item)}
                          className='text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 cursor-pointer'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className='text-red-600 hover:text-red-800 px-2 py-1 rounded-md hover:bg-red-100 cursor-pointer'
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' className='text-center py-6 text-gray-500'>
                    Tidak ada berita
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default D_News
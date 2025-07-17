import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const D_Classes = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    sections: '',
  });

  const [updateId, setUpdateId] = useState(null);
  const [classes, setClasses] = useState([]);

  // Fetch semua kelas
  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/class/get-all-classes', {
        withCredentials: true,
      });
      setClasses(res.data.classes || []);
    } catch (err) {
      console.error('Gagal mengambil data kelas:', err);
      setError('Gagal mengambil data kelas');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Handle input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      sections: formData.sections
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/class/update-class/${updateId}`, dataToSend, {
          withCredentials: true,
        });
        toast.success('Data kelas berhasil diperbarui');
      } else {
        await axios.post('http://localhost:5050/api/v1/class/create-class', dataToSend, {
          withCredentials: true,
        });
        toast.success('Data kelas berhasil ditambahkan');
      }

      setFormData({ name: '', sections: '' });
      setUpdateId(null);
      fetchClasses();
    } catch (err) {
      console.error('Gagal menyimpan data kelas:', err);
      setError('Gagal menyimpan data kelas');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/class/delete-class/${id}`, {
          withCredentials: true,
        });
        toast.success('Kelas berhasil dihapus');
        fetchClasses();
      } catch (error) {
        console.error('Gagal menghapus kelas:', error);
        setError('Gagal menghapus kelas');
      }
    }
  };

  // Handle edit
  const handleEdit = (cls) => {
    setFormData({
      name: cls.name || '',
      sections: Array.isArray(cls.sections) ? cls.sections.join(', ') : cls.sections || '',
    });
    setUpdateId(cls._id);
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Data Kelas</h2>
        {error && <p className="text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nama Kelas</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan Nama Kelas"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <input
              type="text"
              name="sections"
              value={formData.sections}
              onChange={handleChange}
              placeholder="Contoh: IPA1, IPA2, IPS1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer"
            >
              {updateId ? 'Update Data Kelas' : 'Simpan Data Kelas'}
            </button>

            {updateId && (
              <button
                type="button"
                onClick={() => {
                  setUpdateId(null);
                  setFormData({ name: '', sections: '' });
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition duration-300 cursor-pointer"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Data Kelas</h2>
          <div className="text-sm text-gray-500">Total: {classes.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.length > 0 ? (
                classes.map((cls, index) => (
                  <tr key={cls._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-center text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cls.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {Array.isArray(cls.sections) ? cls.sections.join(", ") : cls.sections}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(cls)}
                          className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cls._id)}
                          className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md hover:bg-red-100 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p>🚫 Data kelas tidak tersedia</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default D_Classes;

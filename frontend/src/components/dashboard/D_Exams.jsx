import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const D_Exams = () => {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    classId: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchExams();
    fetchClasses();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/exam/get-all-exams', {
        withCredentials: true,
      });
      setExams(res.data.exams || []);
    } catch (err) {
      console.error('Gagal mengambil data ujian:', err);
      setError('Gagal mengambil data ujian');
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/exam/update-exam/${updateId}`, formData, {
          withCredentials: true,
        });
        toast.success('Ujian berhasil diperbarui');
      } else {
        await axios.post('http://localhost:5050/api/v1/exam/create-exam', formData, {
          withCredentials: true,
        });
        toast.success('Ujian berhasil ditambahkan');
      }

      setFormData({ name: '', classId: '', startDate: '', endDate: '' });
      setUpdateId(null);
      fetchExams();
    } catch (err) {
      console.error('Gagal menyimpan ujian:', err);
      setError('Gagal menyimpan data ujian');
      toast.error('Gagal menyimpan data ujian');
    }
  };

  const handleEdit = (exam) => {
    setFormData({
      name: exam.name || '',
      classId: exam.classId?._id || '',
      startDate: exam.startDate ? new Date(exam.startDate).toISOString().slice(0, 10) : '',
      endDate: exam.endDate ? new Date(exam.endDate).toISOString().slice(0, 10) : '',
    });
    setUpdateId(exam._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus ujian ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/exam/delete-exam/${id}`, {
          withCredentials: true,
        });
        toast.success('Ujian berhasil dihapus');
        fetchExams();
      } catch (err) {
        console.error('Gagal menghapus ujian:', err);
        setError('Gagal menghapus ujian');
        toast.error('Gagal menghapus ujian');
      }
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Form Input */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Data Ujian</h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nama Ujian</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Contoh: UTS Genap 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Kelas</label>
            <select
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Pilih Kelas</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300"
            >
              {updateId ? 'Update Ujian' : 'Simpan Ujian'}
            </button>
            {updateId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: '', classId: '', startDate: '', endDate: '' });
                  setUpdateId(null);
                  setError('');
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Data Ujian</h2>
          <div className="text-sm text-gray-500">Total: {exams.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Ujian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mulai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selesai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exams.length > 0 ? (
                exams.map((exam, index) => (
                  <tr key={exam._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{exam.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{exam.classId?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{exam.startDate ? new Date(exam.startDate).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{exam.endDate ? new Date(exam.endDate).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(exam)}
                          className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exam._id)}
                          className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md hover:bg-red-100"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="py-8">🚫 Data ujian belum tersedia</div>
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

export default D_Exams;
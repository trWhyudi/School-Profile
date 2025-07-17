import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const D_Subjects = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [updateId, setUpdateId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    classId: '',
    teacherId: '',
  });

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/class/get-all-classes', {
        withCredentials: true,
      });
      setClasses(res.data.classes || []);
    } catch (err) {
      console.error('Gagal ambil data kelas:', err);
      setError('Gagal ambil data kelas');
    }
  };

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/teacher/get-all-teacher', {
        withCredentials: true,
      });
      setTeachers(res.data.teachers || []);
    } catch (err) {
      console.error('Gagal ambil data guru:', err);
      setError('Gagal ambil data guru');
    }
  };

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/subject/get-all-subjects', {
        withCredentials: true,
      });
      setSubjects(res.data.subjects || []);
    } catch (err) {
      console.error('Gagal ambil data Pelajaran:', err);
      setError('Gagal ambil data Pelajaran');
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/subject/update-subject/${updateId}`, formData, {
          withCredentials: true,
        });
        toast.success('Pelajaran berhasil diperbarui');
      } else {
        await axios.post('http://localhost:5050/api/v1/subject/create-subject', formData, {
          withCredentials: true,
        });
        toast.success('Pelajaran berhasil ditambahkan');
      }

      setFormData({ name: '', classId: '', teacherId: '' });
      setUpdateId(null);
      fetchSubjects();
    } catch (err) {
      console.error('Gagal simpan data Pelajaran:', err);
      setError('Gagal simpan data Pelajaran');
    }
  };

  const handleEdit = (subj) => {
    setFormData({
      name: subj.name || '',
      classId: subj.classId?._id || '',
      teacherId: subj.teacherId?._id || '',
    });
    setUpdateId(subj._id);
  };

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
        await axios.delete(`http://localhost:5050/api/v1/subject/delete-subject/${id}`, {
          withCredentials: true,
        });
        toast.success('Pelajaran berhasil dihapus');
        fetchSubjects();
      } catch (err) {
        console.error('Gagal hapus Pelajaran:', err);
        setError('Gagal hapus Pelajaran');
      }
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Data Mata Pelajaran</h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nama Pelajaran</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan Nama Pelajaran"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
            <label className="block text-sm font-medium text-gray-700">Guru Pengampu</label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Pilih Guru</option>
              {teachers.map((tcr) => (
                <option key={tcr._id} value={tcr._id}>
                  {tcr.userId?.name || 'Guru'}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer"
            >
              {updateId ? 'Update Data Pelajaran' : 'Simpan Data Pelajaran'}
            </button>

            {updateId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: '', classId: '', teacherId: '' });
                  setUpdateId(null);
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
          <h2 className="text-xl font-semibold text-gray-800">Data Mata Pelajaran</h2>
          <div className="text-sm text-gray-500">Total: {subjects.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pelajaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guru Pengampu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.length > 0 ? (
                subjects.map((subj, index) => (
                  <tr
                    key={subj._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-center text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{subj.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{subj.classId?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{subj.teacherId?.userId?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(subj)}
                          className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(subj._id)}
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
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p>🚫 Data Pelajaran tidak tersedia</p>
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

export default D_Subjects;

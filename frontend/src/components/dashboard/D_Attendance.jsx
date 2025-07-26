import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const D_Attendance = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    classId: '',
    date: '',
    status: '',
  });

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/student/get-all-student', {
        withCredentials: true,
      });
      setStudents(res.data.student || []);
    } catch (err) {
      console.error('Gagal mengambil data siswa:', err);
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
    }
  };

  const fetchAttendances = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/attendance/get-all-attendance', {
        withCredentials: true,
      });
      setAttendances(res.data.attendance || []);
    } catch (err) {
      console.error('Gagal mengambil data presensi:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchAttendances();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/attendance/update-attendance/${updateId}`, formData, {
          withCredentials: true,
        });
        toast.success('Data presensi berhasil diperbarui');
      } else {
        await axios.post('http://localhost:5050/api/v1/attendance/create-attendance', formData, {
          withCredentials: true,
        });
        toast.success('Data presensi berhasil ditambahkan');
      }

      setFormData({ studentId: '', classId: '', date: '', status: '' });
      setUpdateId(null);
      fetchAttendances();
    } catch (err) {
      console.error('Gagal menyimpan data presensi:', err);
      setError('Gagal menyimpan data presensi');
    }
  };

  const handleEdit = (att) => {
    setFormData({
      studentId: att.studentId?._id || '',
      classId: att.classId?._id || '',
      date: att.date?.split('T')[0] || '',
      status: att.status || '',
    });
    setUpdateId(att._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus data presensi ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/attendance/delete-attendance/${id}`, {
          withCredentials: true,
        });
        toast.success('Data presensi berhasil dihapus');
        fetchAttendances();
      } catch (err) {
        console.error('Gagal menghapus data presensi:', err);
        setError('Gagal menghapus data presensi');
      }
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Data Presensi</h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Siswa</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Pilih Siswa</option>
              {students.map((stu) => (
                <option key={stu._id} value={stu._id}>
                  {stu.userId?.name || 'Nama Siswa'}
                </option>
              ))}
            </select>
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
            <label className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Pilih Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpa">Alpa</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer"
            >
              {updateId ? 'Update Presensi' : 'Simpan Presensi'}
            </button>
            {updateId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ studentId: '', classId: '', date: '', status: '' });
                  setUpdateId(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg cursor-pointer"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Data Presensi</h2>
          <div className="text-sm text-gray-500">Total: {attendances.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendances.length > 0 ? (
                attendances.map((att, index) => (
                  <tr key={att._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{att.studentId?.userId?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{att.classId?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{att.date ? new Date(att.date).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{att.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(att)}
                          className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(att._id)}
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
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="py-8">🚫 Data presensi belum tersedia</div>
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

export default D_Attendance;

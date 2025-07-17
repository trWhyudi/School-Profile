import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const D_Results = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    examId: '',
    subject: '',
    marksObtained: '',
    totalMarks: '',
    grade: '',
  });

  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/student/get-all-student', {
        withCredentials: true,
      });
      setStudents(res.data.student || []);
    } catch (error) {
      console.error("Gagal mengambil data siswa:", error);
    }
  };

  // Fetch exams
  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/exam/get-all-exams', {
        withCredentials: true,
      });
      setExams(res.data.exams || []);
    } catch (error) {
      console.error("Gagal mengambil data ujian:", error);
    }
  };

  // Fetch results
  const fetchResults = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/result/get-all-result', {
        withCredentials: true,
      });
      setResults(res.data.results || []);
    } catch (error) {
      console.error("Gagal mengambil data hasil:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchExams();
    fetchResults();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['marksObtained', 'totalMarks'].includes(name) ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/result/update-result/${updateId}`, formData, {
          withCredentials: true,
        });
        toast.success("Data hasil berhasil diperbarui");
      } else {
        await axios.post('http://localhost:5050/api/v1/result/create-result', formData, {
          withCredentials: true,
        });
        toast.success("Data hasil berhasil ditambahkan");
      }

      setFormData({
        studentId: '',
        examId: '',
        subject: '',
        marksObtained: '',
        totalMarks: '',
        grade: '',
      });
      setUpdateId(null);
      fetchResults();
    } catch (error) {
      console.error("Gagal menyimpan data hasil:", error);
      setError("Gagal menyimpan data hasil");
    }
  };

  // Edit
  const handleEdit = (item) => {
    setFormData({
      studentId: item.studentId?._id || '',
      examId: item.examId?._id || '',
      subject: item.subject || '',
      marksObtained: item.marksObtained || '',
      totalMarks: item.totalMarks || '',
      grade: item.grade || '',
    });
    setUpdateId(item._id);
  };

  // Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/result/delete-result/${id}`, {
          withCredentials: true,
        });
        toast.success("Data hasil berhasil dihapus");
        fetchResults();
      } catch (error) {
        console.error("Gagal menghapus hasil:", error);
        setError("Gagal menghapus hasil");
      }
    }
  };

  return (
    <div className='py-10 px-4 max-w-7xl mx-auto'>
      <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Form Data Hasil Ujian</h2>
        {error && <p className='text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md'>{error}</p>}

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          <div>
            <label className='block mb-1 text-sm font-medium'>Siswa</label>
            <select
              name='studentId'
              value={formData.studentId}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
            >
              <option value="">Pilih Siswa</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>{s.userId?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='block mb-1 text-sm font-medium'>Ujian</label>
            <select
              name='examId'
              value={formData.examId}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
            >
              <option value="">Pilih Ujian</option>
              {exams.map((ex) => (
                <option key={ex._id} value={ex._id}>{ex.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='block mb-1 text-sm font-medium'>Mata Pelajaran</label>
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              placeholder='Contoh: Matematika'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm font-medium'>Nilai Diperoleh</label>
            <input
              type='number'
              name='marksObtained'
              value={formData.marksObtained}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm font-medium'>Total Nilai</label>
            <input
              type='number'
              name='totalMarks'
              value={formData.totalMarks}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm font-medium'>Grade</label>
            <input
              type='text'
              name='grade'
              value={formData.grade}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              placeholder='Contoh: A, B+'
            />
          </div>

          <div className='md:col-span-2 flex flex-col sm:flex-row gap-4'>
            <button
              type='submit'
              className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer'
            >
              {updateId ? 'Update Data Hasil' : 'Simpan Data Hasil'}
            </button>
            {updateId && (
              <button
                type='button'
                onClick={() => {
                  setUpdateId(null);
                  setFormData({
                    studentId: '',
                    examId: '',
                    subject: '',
                    marksObtained: '',
                    totalMarks: '',
                    grade: '',
                  });
                }}
                className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition duration-300 cursor-pointer'
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-800'>Data Hasil Ujian</h2>
          <div className='text-sm text-gray-500'>Total: {results.length}</div>
        </div>

        <div className='overflow-x-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ujian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mapel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.length > 0 ? results.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-center text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.studentId?.userId?.name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.examId?.name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.marksObtained}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.totalMarks}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.grade}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md hover:bg-red-100 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p>🚫 Data hasil ujian tidak tersedia</p>
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

export default D_Results;
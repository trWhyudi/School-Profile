import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const D_Teachers = () => {
  const [error, setError] = useState("");
  const [teacherData, setTeacherData] = useState({
    userId: "",
    subject: "",
    department: "",
    hireDate: "",
    qualification: "",
  });

  const [updateId, setUpdateId] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [users, setUsers] = useState([]);

  // Ambil data guru
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/v1/teacher/get-all-teacher", {
        withCredentials: true
      });

      setTeachers(res.data.teachers || []);
    } catch (error) {
      console.error("Error mengambil guru:", error);
      setError("Error mengambil data guru");
    }
  };

  // Ambil data user (nama guru)
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/v1/user/all-users", {
        withCredentials: true,
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchUsers();
  }, []);

  // Handle input perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form tambah/update guru
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/teacher/update-teacher/${updateId}`, teacherData, {
          withCredentials: true,
        });
        toast.success("Data guru berhasil diperbarui");
      } else {
        await axios.post("http://localhost:5050/api/v1/teacher/create-teacher", teacherData, {
          withCredentials: true,
        });
        toast.success("Data guru berhasil ditambahkan");
      }

      setTeacherData({
        userId: "",
        subject: "",
        department: "",
        hireDate: "",
        qualification: "",
      });

      setUpdateId(null);
      fetchTeachers();

    } catch (error) {
      console.error("Gagal submit data guru:", error);
      setError("Gagal menyimpan data guru");
    }
  };

  // Hapus guru
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/teacher/delete-teacher/${id}`, {
          withCredentials: true
        });
        toast.success("Guru berhasil dihapus");
        fetchTeachers();
      } catch (error) {
        console.error("Error menghapus guru:", error);
        setError("Error menghapus guru");
      }
    }
  };


  // Edit data guru
  const handleEdit = (tcr) => {
    setTeacherData({
      userId: tcr.userId?._id || "",
      subject: tcr.subject || "",
      department: tcr.department || "",
      hireDate: tcr.hireDate || "",
      qualification: tcr.qualification || "",
    });
    setUpdateId(tcr._id);
  };

  return (
    <div className='py-10 px-4 max-w-7xl mx-auto'>
      <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Form Data Guru</h2>
        {error && <p className='text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md'>{error}</p>}

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Nama Guru</label>
            <select
              name="userId"
              value={teacherData.userId}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required
            >
              <option value="">Pilih Nama Guru</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Mata Pelajaran</label>
            <input 
              type="text" 
              placeholder='Masukkan Mata Pelajaran' 
              name='subject' 
              value={teacherData.subject}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Tanggal Masuk</label>
            <input 
              type="date" 
              name='hireDate' 
              value={teacherData.hireDate}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Departemen</label>
            <input 
              type="text" 
              placeholder='Masukkan Departemen' 
              name='department' 
              value={teacherData.department}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Lulusan</label>
            <input 
              type="text" 
              placeholder='Masukkan Lulusan' 
              name='qualification' 
              value={teacherData.qualification}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2'
              required
            />
          </div>

          <div className='md:col-span-2 flex flex-col sm:flex-row gap-4'>
            <button 
              type='submit' 
              className='flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer'
            >
              {updateId ? "Update Data Guru" : "Simpan Data Guru"}
            </button>

            {updateId && (
              <button 
                type='button'
                onClick={() => {
                  setUpdateId(null);
                  setTeacherData({
                    userId: "",
                    subject: "",
                    department: "",
                    hireDate: "",
                    qualification: "",
                  });
                }}
                className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition duration-300'
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-800'>Data Guru</h2>
          <div className='text-sm text-gray-500'>
            Total: {teachers.length} Guru
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lulusan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Masuk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.length > 0 ? teachers.map((tcr, index) => (
                <tr key={tcr._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-center text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{tcr.userId?.name || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tcr.subject || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tcr.department || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tcr.qualification || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tcr.hireDate ? new Date(tcr.hireDate).toLocaleDateString("id-ID") : "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(tcr)} 
                        className="text-sky-600 hover:text-sky-800 px-2 py-1 rounded-md hover:bg-sky-100 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(tcr._id)} 
                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md hover:bg-red-100 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p>🚫Data guru tidak tersedia</p>
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

export default D_Teachers;

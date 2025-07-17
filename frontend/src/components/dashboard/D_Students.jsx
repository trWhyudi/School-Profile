import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const D_Students = () => {
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState({
    userId: "",
    rollNumber: "",
    classId: "",
    section: "",
    admissionDate: "",
    guardianInfo: {
      name: "",
      phone: "",
      relation: "",
    }
  });

  const [updateId, setUpdateId] = useState(null);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [availableSections, setAvailableSections] = useState([]);

  // Ambil data kelas
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/v1/class/get-all-classes", {
          withCredentials: true
        });
        setClasses(res.data.classes || []);
      } catch (error) {
        console.error("Error mengambil kelas:", error);
        setError("Error mengambil kelas");
      }
    };
    fetchClasses();
  }, []);

  // Ambil data murid
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/v1/student/get-all-student");
      setStudents(res.data.student || []);
    } catch (error) {
      console.error("Error mengambil murid:", error);
      setError("Error mengambil murid");
    }
  };

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
    fetchStudents();
    fetchUsers();
  }, []);

  // Update availableSections saat selectedClass berubah
  useEffect(() => {
    if (selectedClass && classes.length > 0) {
      const classData = classes.find((cls) => cls._id === selectedClass);
      if (classData && Array.isArray(classData.sections)) {
        setAvailableSections(classData.sections);
        setStudentData((prevData) => ({
          ...prevData,
          section: classData.sections[0] || "",
          classId: selectedClass,
        }));
      } else {
        setAvailableSections([]);
        setStudentData((prevData) => ({
          ...prevData,
          section: "",
          classId: selectedClass,
        }));
      }
    } else {
      setAvailableSections([]);
      setStudentData((prevData) => ({
        ...prevData,
        section: "",
        classId: "",
      }));
    }
  }, [selectedClass, classes]);

  // Handle input perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["name", "phone", "relation"].includes(name)) {
      setStudentData((prev) => ({
        ...prev,
        guardianInfo: {
          ...prev.guardianInfo,
          [name]: value,
        },
      }));
    } else {
      setStudentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  // Submit form tambah murid
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateId) {
        // UPDATE murid
        await axios.put(`http://localhost:5050/api/v1/student/updated-student/${updateId}`, studentData, {
          withCredentials: true,
        });
        toast.success("Data murid berhasil diperbarui");
      } else {
        // TAMBAH murid baru
        await axios.post("http://localhost:5050/api/v1/student/create-student", studentData, {
          withCredentials: true,
        });
        toast.success("Murid berhasil ditambahkan");
      }

      // Reset form
      setStudentData({
        userId: "",
        rollNumber: "",
        classId: "",
        section: "",
        admissionDate: "",
        guardianInfo: {
          name: "",
          phone: "",
          relation: "",
        }
      });
      setSelectedClass("");
      setAvailableSections([]);
      setUpdateId(null); // Reset mode update
      fetchStudents();

    } catch (error) {
      console.error("Gagal submit data murid:", error);
      setError("Gagal menyimpan data murid");
    }
  };

  // Hapus murid
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

    if(result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/student/deleted-student/${id}`, { withCredentials: true });
        toast.success("Murid berhasil dihapus");
        fetchStudents();
      } catch (error) {
        console.error("Error menghapus murid:", error);
        setError("Error menghapus murid");
      }
    }
  };

  // (Opsional) Fungsi handleEdit kalau mau tambah update data murid
  const handleEdit = (stu) => {
    const formattedDate = stu.admissionDate
    ? new Date(stu.admissionDate).toISOString().split("T")[0]
    : "";

    setStudentData({
      userId: stu.userId?._id || "",
      rollNumber: stu.rollNumber || "",
      classId: stu.classId?._id || "",
      section: stu.section || "",
      admissionDate: formattedDate,
      guardianInfo: {
        name: stu.guardianInfo?.name || "",
        phone: stu.guardianInfo?.phone || "",
        relation: stu.guardianInfo?.relation || "",
      }
    });
    setSelectedClass(stu.classId?._id || "");
    setUpdateId(stu._id);
  };

return (
  <div className='py-10 px-4 max-w-7xl mx-auto'>
    <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Form Data Murid</h2>
      {error && <p className='text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md'>{error}</p>}

      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Nama Murid</label>
          <select
            name="userId"
            value={studentData.userId}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-4 py-2'
            required
          >
            <option value="">Pilih Nama Murid</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Nomor Absen</label>
          <input 
            type="text" 
            placeholder='Masukkan Nomor Absen' 
            name='rollNumber' 
            value={studentData.rollNumber}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Tanggal Masuk</label>
          <input 
            type="date" 
            name='admissionDate' 
            value={studentData.admissionDate}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Nama Orang Tua/Wali</label>
          <input 
            type="text" 
            placeholder='Masukkan Nama Orang Tua/Wali' 
            name='name' 
            value={studentData.guardianInfo.name}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Nomor Telepon</label>
          <input 
            type="text" 
            placeholder='Masukkan Nomor Telepon' 
            name='phone' 
            value={studentData.guardianInfo.phone}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Hubungan</label>
          <input 
            type="text" 
            placeholder='Masukkan Hubungan' 
            name='relation' 
            value={studentData.guardianInfo.relation}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Tingkat Kelas</label>
          <select 
            name="classId" 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)} 
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            required
          >
            <option value="">Pilih Tingkat Kelas</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Kelas</label>
          <select 
            name="section" 
            value={studentData.section} 
            onChange={handleChange} 
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50'
            disabled={availableSections.length === 0}
            required
          >
            <option value="">{availableSections.length ? "Pilih Kelas" : "Pilih Tingkat dulu"}</option>
            {availableSections && availableSections.map((sec, index) => (
              <option key={index} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div className='md:col-span-2 flex flex-col sm:flex-row gap-4'>
          <button 
            type='submit' 
            className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer'
          >
            {updateId ? "Update Data Murid" : "Simpan Data Murid"}
          </button>

          {updateId && (
            <button 
              type='button'
              onClick={() => {
                setUpdateId(null);
                setStudentData({
                  userId: "",
                  name: "",
                  admissionDate: "",
                  guardianInfo: {
                    name: "",
                    phone: "",
                    relation: "",
                  },
                  classId: "",
                  section: "",
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
        <h2 className='text-xl font-semibold text-gray-800'>Data Murid</h2>
        <div className='text-sm text-gray-500'>
          Total: {students.length}
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Masuk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orang Tua/Wali</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? students.map((stu, index) => (
              <tr key={stu._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stu.userId?.name || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stu.rollNumber || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stu.classId?.name || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stu.section || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stu.admissionDate ? new Date(stu.admissionDate).toLocaleDateString("id-ID") : "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stu.guardianInfo?.name ? (
                    <div>
                      <div className="font-medium">{stu.guardianInfo.name}</div>
                      <div className="text-xs text-gray-400">({stu.guardianInfo.relation})</div>
                    </div>
                  ) : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stu.guardianInfo?.phone || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(stu)} 
                      className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(stu._id)} 
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                  <div className="flex flex-col items-center justify-center py-8">
                    <p>🚫Data murid tidak tersedia</p>
                  </div>
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

export default D_Students;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const D_Fees = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    amount: '',
    dueDate: '',
    status: 'Belum Dibayar',
    paymentDate: '',
  });
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchFees();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/student/get-all-student', { withCredentials: true });
      setStudents(res.data.student || []);
    } catch (err) {
      console.error("Gagal mengambil murid:", err);
      setError("Gagal mengambil data murid");
    }
  };

  const fetchFees = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/fee/get-all-fee', { withCredentials: true });
      setFees(res.data.fees || []);
    } catch (err) {
      console.error("Gagal mengambil data pembayaran:", err);
      setError("Gagal mengambil data pembayaran");
    }
  };

  const payload = {
    ...formData,
    paymentDate: formData.status === 'Dibayar' && formData.paymentDate
      ? formData.paymentDate
      : null
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateId) {
        await axios.put(`http://localhost:5050/api/v1/fee/update-fee/${updateId}`, payload, { withCredentials: true });
        toast.success("Data pembayaran berhasil diperbarui");
      } else {
        await axios.post('http://localhost:5050/api/v1/fee/create-fee', payload, { withCredentials: true });
        toast.success("Data pembayaran berhasil ditambahkan");
      }
      resetForm();
      fetchFees();
    } catch (err) {
      console.error("Gagal simpan data pembayaran:", err);
      setError("Gagal menyimpan data pembayaran");
    }
  };

  const handleEdit = (fee) => {
    setFormData({
      studentId: fee.studentId?._id || '',
      amount: fee.amount,
      dueDate: fee.dueDate ? new Date(fee.dueDate).toISOString().split("T")[0] : '',
      status: fee.status,
      paymentDate: fee.paymentDate ? new Date(fee.paymentDate).toISOString().split("T")[0] : '',
    });
    setUpdateId(fee._id);
  };

  const handleDelete = async (id) => {
    const resp = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus data pembayaran ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (resp.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/v1/fee/delete-fee/${id}`, { withCredentials: true });
        toast.success("Data pembayaran berhasil dihapus");
        fetchFees();
      } catch (err) {
        console.error("Gagal hapus data pembayaran:", err);
        setError("Gagal hapus data pembayaran");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      amount: '',
      dueDate: '',
      status: 'Belum Dibayar',
      paymentDate: '',
    });
    setUpdateId(null);
    setError('');
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Form Input Fee */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Data Pembayaran Murid</h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 rounded-md">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nama Murid</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Pilih Murid</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.userId?.name || "-"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="Belum Dibayar">Belum Dibayar</option>
              <option value="Dibayar">Dibayar</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tanggal Pembayaran</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              disabled={formData.status === "Belum Dibayar"}
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer"
            >
              {updateId ? "Update Pembayaran" : "Tambah Pembayaran"}
            </button>

            {updateId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition duration-300 cursor-pointer"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Fee */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Data Pembayaran Murid</h2>
          <div className="text-sm text-gray-500">Total: {fees.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Murid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tgl Bayar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {fees.length > 0 ? (
                fees.map((f, idx) => (
                  <tr key={f._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-center text-gray-500">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {f.studentId?.userId?.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Rp {f.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {f.dueDate ? new Date(f.dueDate).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td
                      className={
                        "px-6 py-4 text-sm font-medium " +
                        (f.status === "Dibayar" ? "text-green-600" : "text-red-600")
                      }
                    >
                      {f.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {f.paymentDate ? new Date(f.paymentDate).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(f)}
                          className="text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(f._id)}
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
                  <td colSpan="7" className="px-6 py-6 text-center text-gray-500">
                    🚫 Data pembayaran murid tidak tersedia
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

export default D_Fees;
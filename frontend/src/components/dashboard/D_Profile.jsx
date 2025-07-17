import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      const updateData = new FormData();
      updateData.append('name', formData.name);
      updateData.append('email', formData.email);
      updateData.append('phone', formData.phone);
      updateData.append('address', formData.address);
      if (avatarFile) {
        updateData.append('avatar', avatarFile);
      }

      const { data } = await axios.put(
        `http://localhost:5050/api/v1/user/update-user/${user._id}`,
        updateData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success(data.message);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Yakin ingin menghapus akun ini?')) {
      try {
        await axios.delete(
          `http://localhost:5050/api/v1/user/delete-user/${user._id}`,
          { withCredentials: true }
        );
        toast.success('Akun berhasil dihapus');
        setIsAuth(false);
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Gagal menghapus akun');
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-10 px-4'>
      <div className='bg-indigo-100 shadow-xl rounded-2xl overflow-hidden w-full max-w-3xl'>
        <div className='flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-8'>
          <div className='relative w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md'>
            <img
              src={avatarPreview}
              alt='Avatar'
              className='w-full h-full object-cover'
            />
            {editMode && (
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='absolute inset-0 opacity-0 cursor-pointer'
                title='Ganti foto'
              />
            )}
          </div>

          <div className='text-center md:text-left space-y-4 w-full'>
            {editMode ? (
              <form className='space-y-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>Nama</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 rounded border border-gray-300'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 rounded border border-gray-300'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>Telepon</label>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 rounded border border-gray-300'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>Alamat</label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 rounded border border-gray-300'
                  />
                </div>
              </form>
            ) : (
              <>
                <h2 className='text-2xl font-bold text-gray-800'>{user?.name}</h2>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Role: </span>
                  <span className='text-red-600'>{user?.role}</span>
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Email: </span>{user?.email}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Telepon: </span>{user?.phone}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Alamat: </span>{user?.address}
                </p>
              </>
            )}
          </div>
        </div>

        <div className='flex justify-center md:justify-end gap-4 p-6'>
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className='bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition shadow cursor-pointer'
              >
                Simpan
              </button>
              <button
                onClick={() => setEditMode(false)}
                className='bg-gray-300 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-400 transition shadow cursor-pointer'
              >
                Batal
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className='flex items-center gap-2 bg-indigo-500 text-white font-medium px-5 py-2 rounded-full hover:bg-indigo-600 transition duration-300 shadow cursor-pointer'
            >
              <FaUserEdit />
              Edit Profil
            </button>
          )}
          <button
            onClick={handleDelete}
            className='flex items-center gap-2 bg-red-500 text-white font-medium px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow cursor-pointer'
          >
            <FaTrashAlt />
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

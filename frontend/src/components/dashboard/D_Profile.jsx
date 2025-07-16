import React, { useContext} from 'react'
import { Context } from '../../main'
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';

const Profile = () => {
  const  {user} = useContext(Context);

  return (
    <div className='min-h-screen bg-gradient-to-r from-sky-50 to-indigo-200 flex items-center justify-center py-10 px-4'>
      <div className='bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-3xl'>
        <div className='flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-8 bg-sky-50'>
          <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md'>
            <img src={user?.avatar?.url} alt="Avatar" className='w-full h-full object-cover cursor-pointer'/>
          </div>
          <div className='text-center md:text-left space-y-2'>
            <h2 className='text-2xl font-bold text-gray-800'>{user?.name}</h2>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold'>Role: </span>
              <span className='text-red-600'>{user?.role}</span>
            </p>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold'>Email: </span>
              {user?.email}
            </p>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold'>Telepon: </span>
              {user?.phone}
            </p>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold'>Alamat: </span>
              {user?.address}
            </p>
          </div>
        </div>
        <div className='flex justify-center md:justify-end gap-4 p-6'>
          <button className='flex items-center gap-2 cursor-pointer bg-indigo-500 text-white font-medium px-5 py-2 rounded-full hover:bg-indigo-600 transition duration-300 shadow'>
            <FaUserEdit />
            Update
          </button>
          <button className='flex items-center gap-2 cursor-pointer bg-red-500 text-white font-medium px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow'>
            <FaTrashAlt />
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
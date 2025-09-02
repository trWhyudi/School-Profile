import React, { useContext } from 'react'
import { Context } from '../main'

const Profile = () => {
    const {user} = useContext(Context);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 py-30 md:py-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 bg-sky-100 flex items-center justify-center p-8">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-sky-200 rounded-full blur opacity-75 animate-pulse"></div>
                                <img 
                                    src={user.avatar.url} 
                                    alt="Profile" 
                                    className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
                                />
                            </div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="space-y-6">
                                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                                <p className="flex items-center space-x-2 text-lg text-gray-600">
                                    <span className="font-semibold text-sky-600 w-28">Email:</span>
                                    <span>{user.email}</span>
                                </p>
                                <p className="flex items-center space-x-2 text-lg text-gray-600">
                                    <span className="font-semibold text-sky-600 w-28">No. Telepon:</span>
                                    <span>{user.phone || '-'}</span>
                                </p>
                                <p className="flex items-center space-x-2 text-lg text-gray-600">
                                    <span className="font-semibold text-sky-600 w-28">Pendidikan:</span>
                                    <span>{user.education || '-'}</span>
                                </p>
                                <p className="flex items-center space-x-2 text-lg text-gray-600">
                                    <span className="font-semibold text-sky-600 w-28">Role:</span>
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">
                                        {user.role}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
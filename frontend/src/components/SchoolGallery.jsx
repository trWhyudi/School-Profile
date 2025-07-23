import React, { useState } from 'react'
import { FaHeart, FaTimes } from "react-icons/fa";

const SchoolGallery = () => {
    const [gallery, setGallery] = useState([
        {
            id: 1,
            title: "Pameran Seni SMAN 1 Cibitung",
            likes: 12,
            isLiked: false,
            imageUrl: "/images/galeri/galeri1.jpeg"
        },
        {
            id: 2,
            title: "Pameran Seni SMAN 1 Cibitung",
            likes: 18,
            isLiked: false,
            imageUrl: "/images/galeri/galeri2.jpeg"
        },
        {
            id: 3,
            title: "Kegiatan Expo Kampus SMAN 1 Cibitung",
            likes: 15,
            isLiked: false,
            imageUrl: "/images/galeri/galeri3.jpeg"
        },
        {
            id: 4,
            title: "Wisata Sains SMAN 1 Cibitung",
            likes: 17,
            isLiked: false,
            imageUrl: "/images/galeri/galeri4.jpg"
        },
        {
            id: 5,
            title: "Wisata Sains SMAN 1 Cibitung",
            likes: 24,
            isLiked: false,
            imageUrl: "/images/galeri/galeri5.jpg"
        },
    ])

    const [selectedImage, setSelectedImage] = useState(null)
    
    const toggleLike = (id) => {
        setGallery(
            gallery.map((item) => item.id === id ? {
                ...item,
                likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                isLiked: !item.isLiked
            } : item)
        )
    }

    const openModal = (image) => {
        setSelectedImage(image)
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-50 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <div className="max-w-[1440px] mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-600 text-center mb-2">Galeri Sekolah</h2>
                <p className="text-lg text-gray-600 text-center mb-12">Semua kegiatan di sekolah kami</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div 
                                className="relative h-48 overflow-hidden cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                <div className="flex items-center space-x-1">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(item.id);
                                        }}
                                        className={`p-2 rounded-full ${item.isLiked ? 'text-red-500' : 'text-gray-400'} hover:bg-red-50 transition-colors duration-200`}
                                    >
                                        <FaHeart className={`${item.isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <span className="text-gray-600">{item.likes}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                        <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl">
                            <button 
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                            >
                                <FaTimes className="text-gray-800 text-xl" />
                            </button>
                            
                            <div className="relative h-[70vh]">
                                <img 
                                    src={selectedImage.imageUrl} 
                                    alt={selectedImage.title} 
                                    className="w-full h-full object-contain mt-5"
                                />
                            </div>
                            
                            <div className="p-6 bg-white border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            onClick={() => {
                                                toggleLike(selectedImage.id);
                                                setSelectedImage({
                                                    ...selectedImage,
                                                    isLiked: !selectedImage.isLiked,
                                                    likes: selectedImage.isLiked ? selectedImage.likes - 1 : selectedImage.likes + 1
                                                });
                                            }}
                                            className={`p-2 rounded-full ${selectedImage.isLiked ? 'text-red-500' : 'text-gray-400'} hover:bg-red-50 transition-colors duration-200`}
                                        >
                                            <FaHeart className={`text-xl ${selectedImage.isLiked ? 'fill-current' : ''}`} />
                                        </button>
                                        <span className="text-gray-700 font-medium">{selectedImage.likes} likes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SchoolGallery
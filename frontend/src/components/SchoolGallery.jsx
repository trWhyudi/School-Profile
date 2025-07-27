import React, { useEffect, useState } from 'react';
import { FaHeart, FaTimes } from "react-icons/fa";
import axios from 'axios';

const SchoolGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    // Ambil galeri dari backend
    const fetchGallery = async () => {
        try {
            const res = await axios.get("http://localhost:5050/api/v1/gallery/get-all-gallery", {
                withCredentials: true,
            });
            const data = res.data.gallery.map((item) => ({
                ...item,
                isLiked: item.likesBy?.includes("USER_ID"),
            }));
            setGallery(data);
        } catch (err) {
            console.error("Gagal mengambil galeri:", err);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    // Toggle Like
    const toggleLike = async (id) => {
        try {
            const res = await axios.put(
            `http://localhost:5050/api/v1/gallery/like-gallery/${id}`,
            {},
            { withCredentials: true }
        );

        setGallery((prev) =>
            prev.map((item) =>
            item._id === id
                ? {
                    ...item,
                    likes: res.data.likes,
                    isLiked: !item.isLiked,
                }
                : item
            )
        );

        if (selectedImage?._id === id) {
            setSelectedImage((prev) => ({
                ...prev,
                likes: res.data.likes,
                isLiked: !prev.isLiked,
            }));
        }
        } catch (err) {
            console.error("Gagal like:", err);
        }
    };

    const openModal = (image) => setSelectedImage(image);
    const closeModal = () => setSelectedImage(null);

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-50 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="max-w-[1440px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-600 text-center mb-3">
            Galeri Sekolah
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 text-center">Kumpulan Momen Berharga, Kegiatan Seru, dan Suasana Pembelajaran di Sekolah Kami</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="zoom-in">
            {gallery.map((item) => (
                <div
                key={item._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                <div
                    className="relative h-48 overflow-hidden cursor-pointer"
                    onClick={() => openModal(item)}
                >
                    <img
                    src={item.image?.url}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item._id);
                        }}
                        className={`p-2 rounded-full cursor-pointer ${
                        item.isLiked ? "text-red-500" : "text-gray-400"
                        } hover:bg-red-50 transition-colors duration-200`}
                    >
                        <FaHeart className={item.isLiked ? "fill-current" : ""} />
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
                    src={selectedImage.image?.url}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain mt-5"
                    />
                </div>

                <div className="p-6 bg-white border-t border-gray-200">
                    <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
                    <div className="flex items-center space-x-2">
                        <button
                        onClick={() => toggleLike(selectedImage._id)}
                        className={`p-2 rounded-full ${
                            selectedImage.isLiked ? "text-red-500" : "text-gray-400"
                        } hover:bg-red-50 transition-colors duration-200`}
                        >
                        <FaHeart className="text-xl" />
                        </button>
                        <span className="text-gray-700 font-medium">
                        {selectedImage.likes} likes
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default SchoolGallery;

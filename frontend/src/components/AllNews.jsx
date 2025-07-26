import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllNews = () => {
    const [newsList, setNewsList] = useState([]);

    const fetchNews = async () => {
        try {
            const { data } = await axios.get("http://localhost:5050/api/v1/news/get-all-news");
            setNewsList(data.news);
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal memuat berita");
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const settings = {
        dots: true,
        infinite: newsList.length > 1,
        speed: 500,
        slidesToShow: Math.min(3, newsList.length),
        slidesToScroll: 1,
        autoplay: newsList.length > 1,
        autoplaySpeed: 4000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="bg-sky-50 py-20" data-aos="fade-up">
            <div className="max-w-[1440px] mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-sky-600 mb-12 text-center">
                    Berita Sekolah
                </h1>

                {newsList && newsList.length > 0 ? (
                    newsList.length === 1 ? (
                        <div className="flex justify-center" data-aos="zoom-in">
                            <div className="max-w-md w-full">
                                <NewsCard item={newsList[0]} />
                            </div>
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {newsList.map((item) => (
                                <div key={item._id} className="px-4 cursor-pointer" data-aos="zoom-in">
                                    <NewsCard item={item} />
                                </div>
                            ))}
                        </Slider>
                    )
                ) : (
                    <p className="text-center text-lg text-red-600 mt-8">🚫 Tidak ada berita tersedia</p>
                )}
            </div>
        </div>
    );
};

const NewsCard = ({ item }) => {
    return (
        <div className="bg-white/80 backdrop-blur-lg border border-sky-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 duration-300 my-8">
            <Link to={`/news/${item._id}`}>
            {item.image?.url && (
                <img
                    src={item.image.url}
                    alt="Berita"
                    className="w-full h-48 object-cover rounded-xl mb-4 border"
                />
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-2 hover:underline">
                {item.title}
            </h2>
            </Link>
            <p className="text-gray-600 line-clamp-3 mb-3">{item.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1"><FaUser /> {item.author}</span>
                <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(item.publishedAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default AllNews;

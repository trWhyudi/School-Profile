import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaUser, FaArrowLeft, FaShareAlt, FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NewsDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchNewsDetail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5050/api/v1/news/single-news/${id}`)
            setNews(data.news)
            setLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal memuat detail berita")
            navigate("/") // kembali ke halaman utama jika gagal
        }
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: news.content.substring(0, 100) + '...',
                url: window.location.href,
            })
            .catch(() => toast.info('Berbagi dibatalkan'))
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link berita disalin ke clipboard!')
        }
    }

    useEffect(() => {
        fetchNewsDetail()
    }, [id])

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-sky-600 hover:text-sky-800 transition-colors font-medium cursor-pointer"
                >
                    <FaArrowLeft /> Kembali ke Beranda
                </button>
            </div>

            {loading ? (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <Skeleton height={400} className="mb-6 rounded-xl" />
                    <Skeleton count={1} height={40} className="mb-4" />
                    <div className="flex justify-between mb-6">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={150} height={20} />
                    </div>
                    <Skeleton count={5} height={20} className="mb-2" />
                </div>
            ) : news ? (
                <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {news.image?.url && (
                        <div className="relative mb-8 rounded-xl overflow-hidden">
                            <img
                                src={news.image.url}
                                alt={news.title}
                                className="w-full h-auto md:h-[500px] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                    )}
                    
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
                                    {news.category || 'Berita'}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {news.title}
                                </h1>
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleShare}
                                    className="p-2 text-gray-500 hover:text-sky-600 transition-colors"
                                    aria-label="Bagikan berita"
                                >
                                    <FaShareAlt size={18} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-500 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-sky-600" />
                                    <span className="font-medium">{news.author || 'Admin'}</span>
                                </div>
                                <span className="hidden sm:inline-block">•</span>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-sky-600" />
                                    <span>{new Date(news.publishedAt).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                            {/* <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                                Dibaca {Math.floor(Math.random() * 1000) + 100} kali
                            </div> */}
                        </div>
                        
                        <div className="prose max-w-none text-gray-700 leading-relaxed text-justify">
                            {news.content.split('\n').map((paragraph, i) => (
                                <p key={i} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                        
                        {news.tags?.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {news.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Maaf, berita yang Anda cari tidak dapat ditemukan.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            )}
        </div>
    )
}

export default NewsDetail
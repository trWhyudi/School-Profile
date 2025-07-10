import React from 'react'

const photoBars = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Perpustakaan",
        description: "Ruang baca yang nyaman dengan koleksi buku terlengkap untuk mendukung proses belajar mengajar.",
        aosDelay: "100"
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lab Komputer",
        description: "Fasilitas komputer modern dengan spesifikasi tinggi untuk praktik teknologi informasi.",
        aosDelay: "200"
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Laboratorium IPA",
        description: "Peralatan lengkap untuk eksperimen sains dengan standar keamanan tinggi.",
        aosDelay: "300"
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Aula Serbaguna",
        description: "Ruang besar untuk berbagai acara sekolah dengan sistem audio visual modern.",
        aosDelay: "400"
    },
]

const PhotoLibrary = () => {
  return (
    <div className='bg-gradient-to-br from-sky-50 to-indigo-200 py-16 px-4' data-aos="fade-up">
        <div className='max-w-[1440px] mx-auto'>
            <div className='text-center mb-16'>
                <h1 className='text-3xl md:text-4xl font-bold text-sky-600 mb-2'>Fasilitas Unggulan Sekolah Kami</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Temukan lingkungan belajar yang mendukung dengan fasilitas modern dan lengkap
                </p>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {photoBars.map((item) => (
                    <div 
                        key={item.id}
                        className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2'
                    >
                        <div className='relative h-56 overflow-hidden'>
                            <img 
                                src={item.img} 
                                alt={item.name}
                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6'>
                                <div className='translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                                    <p className='text-white text-sm'>{item.description}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-white p-6'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>{item.name}</h3>
                            <p className='text-gray-600 text-sm line-clamp-2 sm:hidden'>
                                {item.description}
                            </p>
                            <button className='mt-4 text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors hidden sm:block'>
                                Lihat Detail →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className='text-center mt-16'>
                <button className='px-8 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg'>
                    Lihat Semua Fasilitas
                </button>
            </div>
        </div>
    </div>
  )
}

export default PhotoLibrary
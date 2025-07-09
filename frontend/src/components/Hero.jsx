import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div className='relative w-full mt-10'>
        <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            className='z-0'
        >
            <div>
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Selamat Datang di Sekolah Kami" className='h-[80vh] w-full object-cover' />
                <div className='absolute inset-0 bg-black/45 bg-opacity-50 flex items-center justify-center'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold drop-shadow-lg opacity-70'>Selamat Datang di Sekolah Kami</h1>
                </div>
            </div>

            <div>
                <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mencetak siswa yang cerdas, berkarakter, dan siap menghadapi masa depan." className='h-[80vh] w-full object-cover' />
                <div className='absolute inset-0 bg-black/45 bg-opacity-50 flex items-center justify-center'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold drop-shadow-lg opacity-70'>Mencetak siswa yang cerdas, berkarakter, <br />dan siap menghadapi masa depan.</h1>
                </div>
            </div>
            
            <div>
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Belajar dengan semangat, disiplin, dan nilai-nilai positif." className='h-[80vh] w-full object-cover' />
                <div className='absolute inset-0 bg-black/45 bg-opacity-50 flex items-center justify-center'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold drop-shadow-lg opacity-70'>Belajar dengan semangat, disiplin, dan nilai-nilai positif.</h1>
                </div>
            </div>
        </Carousel>
    </div>
  )
}

export default Hero
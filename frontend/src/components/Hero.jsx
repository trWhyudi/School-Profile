import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div className='relative w-full'>
        <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            className='z-0'
        >
            <div data-aos="fade-in">
                <img src="images/hero/Hero1.jpg" alt="Selamat Datang di Sekolah Kami" className='h-[80vh] w-full object-cover'/>
                <div className='absolute inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold drop-shadow-lg opacity-70'>Selamat Datang di Sekolah Kami</h1>
                </div>
            </div>

            <div>
                <img src="images/hero/Hero2.jpg" alt="Mencetak siswa yang cerdas, berkarakter, dan siap menghadapi masa depan." className='h-[80vh] w-full object-cover' />
                <div className='absolute inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold drop-shadow-lg opacity-70'>Mencetak siswa yang cerdas, berkarakter, <br />dan siap menghadapi masa depan.</h1>
                </div>
            </div>
            
            <div>
                <img src="images/hero/Hero3.jpeg" alt="Belajar dengan semangat, disiplin, dan nilai-nilai positif." className='h-[80vh] w-full object-cover' />
                <div className='absolute inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold drop-shadow-lg opacity-70'>Belajar dengan semangat, disiplin, dan nilai-nilai positif.</h1>
                </div>
            </div>
        </Carousel>
    </div>
  )
}

export default Hero
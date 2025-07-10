import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const TestimonialData = [
    {
        id: 1,
        name: "John Doe",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "John Doe",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "John Doe",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
]

const Testimonials = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }

    return (
        <div className='py-10 bg-sky-50' data-aos="fade-up">
            <div className='max-w-[1440px] mx-auto px-4'>
                <div className='mb-10'>
                    <h1 className='text-center text-3xl md:text-4xl font-bold text-sky-600 cursor-pointer'>Testimoni</h1>
                </div>
                <div data-aos="zoom-in">
                    <Slider {...settings}>
                        {
                            TestimonialData.map((data) => (
                                <div key={data.id} className='my-6 cursor-pointer'>
                                    <div className='flex flex-col gap-4 shadow-lg py-8 mx-4 rounded-xl bg-white relative px-4'>
                                        <div className='mb-4'>
                                            <img src={data.img} alt="" className='rounded-full w-20 h-20 object-cover' />
                                        </div>
                                        <div className='flex flex-col items-center gap-4'>
                                            <div className='space-y-3'>
                                                <p className='text-xl text-gray-500 font-light'>{data.text}</p>
                                                <h1 className='text-black font-semibold text-xl font-cursive2'>{data.name}</h1>
                                            </div>
                                        </div>
                                        <p className='text-gray-300 text-9xl font-serif absolute top-0 right-0'>,,</p>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
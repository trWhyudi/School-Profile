import React from 'react'
import Hero from '../components/Hero'
import PhotoLibrary from '../components/PhotoLibrary'
import SchoolGallery from '../components/SchoolGallery'
import AllTeacher from '../components/AllTeacher'
import Testimonials from '../components/Testimonials'
import Map from '../components/Map'

const Home = () => {
  return (
    <div>
      <Hero />
      <PhotoLibrary />
      <AllTeacher />
      <SchoolGallery />
      <Testimonials />
      <Map />
    </div>
  )
}

export default Home
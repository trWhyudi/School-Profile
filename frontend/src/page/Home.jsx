import React from 'react'
import Hero from '../components/Hero'
import PhotoLibrary from '../components/PhotoLibrary'
import SchoolGallery from '../components/SchoolGallery'
import AllTeacher from '../components/AllTeacher'


const Home = () => {
  return (
    <div>
      <Hero />
      <PhotoLibrary />
      <SchoolGallery />
      <AllTeacher />
    </div>
  )
}

export default Home
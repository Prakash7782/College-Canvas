import React from 'react'
import Navbar from '../component/Navbar.js'
import Footer from '../component/Footer.js'
import Card from '../component/Card.js'
import Carousel from '../component/Carousel.js'


export default function Home() {
  return (
    <div>
      <div> <Navbar /> </div>
      <div className='m-3'><Carousel/></div>
      <div ><Card/></div>
      <div><Footer /></div>

    </div>
  )
}

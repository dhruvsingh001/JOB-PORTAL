import React from 'react'
import Navbar from '../Components/Navbar'
import Intro from '../Components/Intro'
import Joblisting from '../Components/Joblisting'
import Appcontact from '../Components/Appcontact'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <div>
    <Navbar/>
    <Intro/>
    <Joblisting/>
    <Appcontact/>
    <Footer/>
    </div>
  )
}

export default Home

import React from 'react'

import { UserButton, useUser, SignInButton } from '@clerk/react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'


const Navbar = () => {
  const {RecruiterLogin,setRecruiterLogin} =useContext(AppContext)


  const { user } = useUser()

  return (
    <div className='shadow-lg py-4 px-2 mb-2 h-18 flex items-center'>

      <div className='container mx-auto px-4 flex justify-between items-center'>

        {/* Logo */}
        <Link to='/'>
          <img src={assets.logo}/>
        </Link>

        {/* Right Side */}
        <div >

         

          {/* User */}
          {user ? (
            <div className='flex gap-6 items-center'>
              <Link to="/applications">
              <h1  className='text-lg'>Applied jobs</h1>
              </Link>
              <p>|</p>
            <h1 className='text-lg'>Hello {user.firstName} </h1>
            <p>|</p>
            <UserButton />
            </div>
          ) : (<div className='flex items-center gap-6'>
             {/* Recruiter */}
          <button onClick={()=>{setRecruiterLogin(true)}} className='text-gray-700 hover:text-blue-600 hover:scale-90 border-2 p-1.5 px-3 rounded-3xl'>
            Recruiter Login
                    </button>
            <SignInButton mode='modal'>
              <button className='bg-blue-600 text-white px-5 py-2 rounded-full hover:scale-90'>
                Login
              </button>
            </SignInButton></div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Navbar

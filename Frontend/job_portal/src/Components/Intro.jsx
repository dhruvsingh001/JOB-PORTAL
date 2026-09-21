
import React, { useContext, useRef } from 'react'
import { Search, MapPin } from 'lucide-react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'


const Intro = () => {

    const {setisSearch,setSearchfilter,isSearch}=useContext(AppContext)
    const titleRef=useRef(null)
    const locationRef=useRef(null)

    function btn(){
        setSearchfilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        setisSearch(true)
        console.log({title:titleRef.current.value,
            location:locationRef.current.value})
        console.log({isSearch})
    }

  return (
    <div className='w-full mx-auto mt-10 px-4'>
      
      {/* Hero Container */}
      <div className='rounded-xl bg-linear-to-r from-purple-800 to-[#14001f] py-14 px-6 text-center h-100  flex flex-col justify-around text-white'>

        {/* Heading */}
        <h1 className='text-4xl font-medium'>
          Over 10,000+ jobs to apply
        </h1>

        {/* Description */}
        <p className='text-xl mt-3 leading-7'>
          Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities
          <br />
          And Take The First Step Toward Your Future!
        </p>

        {/* Search Box */}
        <div className='bg-white max-w-2xl mx-auto mt-8 rounded-md p-1.5 flex items-center text-gray-500'>

          {/* Job Search */}
          <div className='flex items-center gap-2 flex-1 px-3'>
            <Search size={17} />

            <input
              type='text'
              placeholder='Search for jobs'
              className='outline-none text-sm w-full'
              ref={titleRef}
            />
          </div>

          {/* Divider */}
          <div className='h-6 w-px bg-gray-500'></div>

          {/* Location */}
          <div className='flex items-center gap-2 flex-1 px-3'>
            <MapPin size={17} />

            <input
              type='text'
              placeholder='Location'
              className='outline-none text-sm w-full'
              ref={locationRef}

            />
          </div>

          {/* Search Button */}
          <button onClick={btn} className='bg-blue-600 hover:bg-blue-700 hover:scale-95 text-white text-sm px-8 py-2.5 rounded-md'>
            Search
          </button>

        </div>

      </div>
      <div className=' w-full rounded-2xl border border-gray-400 shadow-lg mt-5 p-6 flex items-center justify-center gap-8'>
        <p className='text-2xl font-bold'>Trusted by</p>
        <img className='h-6' src={assets.microsoft_logo} alt=''/>
        <img className='h-6' src={assets.walmart_logo} alt=''/>
        <img className='h-6' src={assets.accenture_logo} alt=''/>
        <img className='h-6' src={assets.samsung_logo} alt=''/>
        <img className='h-6' src={assets.adobe_logo} alt=''/>
      </div>

    </div>
  )
}

export default Intro


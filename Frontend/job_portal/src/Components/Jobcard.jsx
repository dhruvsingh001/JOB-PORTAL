import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Jobcard = ({job}) => {

    const navigate=useNavigate()
  return (
    <div className='w-full  max-w-65 bg-white border border-gray-200 rounded-xl shadow-lg p-5'>

  {/* Company Logo */}
  <div className='mb-3'>
    <div className='w-10 h-10 flex items-center justify-center'>
      <img
        src={job.companyId.image}
        alt='Slack'
        className='w-9 h-9 object-contain'
      />
    </div>
  </div>


  {/* Job Title */}
  <h2 className='text-base font-medium text-gray-800'>
    {job.title}
  </h2>


  {/* Tags */}
  <div className='flex gap-2 mt-2'>

    <span className='text-[10px] text-blue-500 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded-md'>
      {job.location}
    </span>

    <span className='text-[10px] text-red-400 border border-red-200 bg-red-50 px-2.5 py-1 rounded-md'>
      {job.level}
    </span>

  </div>


  {/* Description */}
  <p className='text-xs text-gray-500 leading-5 mt-3' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}>
    
  </p>


  {/* Buttons */}
  <div className='flex gap-2 mt-4'>

    <button onClick={()=>{navigate(`/applyjobs/${job._id}`);scrollTo(0,0)}} className='bg-blue-600 hover:scale-95 text-white text-xs px-5 py-2 rounded-md hover:bg-blue-700 transition'>
      Apply now
    </button>

    <button onClick={()=>{navigate(`/applyjobs/${job._id}`);scrollTo(0,0)}} className='border hover:scale-95 border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-md hover:bg-gray-50 transition'>
      Learn more
    </button>

  </div>

</div>
  )
}

export default Jobcard
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../Components/Footer'

const Application = () => {

    const [edit, setedit] = useState(false)
    const [Resume, setResume] = useState(null)

    const viewResume = () => {
        if (Resume) {
            const url = URL.createObjectURL(Resume)
            window.open(url, '_blank')
        }
    }

    function btn() {
        setedit(Prev => !Prev)
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl px-6 py-12'>

                <h1 className='text-3xl font-semibold text-gray-800 mb-2'>
                    Your Resume
                </h1>

                <p className='text-gray-500 mb-8'>
                    Upload and manage your resume for job applications.
                </p>

                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-8'>

                    {edit ? (

                        /* Resume is already selected */
                        <div className='flex items-center justify-between'>

                            <div className='flex items-center gap-4'>

                                <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
                                    <img
                                        src={assets.profile_upload_icon}
                                        alt=''
                                        className='w-6 h-6'
                                    />
                                </div>

                                <div>
                                    <p className='text-sm text-gray-500'>
                                        Current Resume
                                    </p>

                                    <p className='font-medium text-gray-800'>
                                        {Resume ? Resume.name : 'Resume'}
                                    </p>
                                </div>

                            </div>

                            <div className='flex gap-3'>

                                <button
                                    onClick={viewResume}
                                    className='px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition'
                                >
                                    View Resume
                                </button>

                                <button
                                    onClick={btn}
                                    className='px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition'
                                >
                                    Edit
                                </button>

                            </div>

                        </div>

                    ) : (

                        /* Upload Resume */
                        <div>

                            <div className='flex items-center gap-4 mb-6'>

                                <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
                                    <img
                                        src={assets.profile_upload_icon}
                                        alt=''
                                        className='w-6 h-6'
                                    />
                                </div>

                                <div>
                                    <h2 className='text-lg font-medium text-gray-800'>
                                        Upload your resume
                                    </h2>

                                    <p className='text-sm text-gray-500'>
                                        PDF files only
                                    </p>
                                </div>

                            </div>

                            <div className='flex items-center gap-4'>

                                <label
                                    htmlFor='upload'
                                    className='cursor-pointer px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition'
                                >
                                    Select Resume

                                    <input
                                        id='upload'
                                        type='file'
                                        accept='application/pdf'
                                        onChange={e => {
                                            setResume(e.target.files[0])
                                        }}
                                        hidden
                                    />
                                </label>

                                {Resume && (
                                    <p className='text-sm text-gray-600'>
                                        {Resume.name}
                                    </p>
                                )}

                            </div>

                            <button
                                onClick={btn}
                                disabled={!Resume}
                                className='mt-6 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed'
                            >
                                Done
                            </button>

                        </div>

                    )}

                </div>

            </div>
            <div className='px-6'>
                <h1 className='text-2xl px-10'>Jobs Applied</h1>
                <div className='border w-3/4 mb-20 p-5 border-gray-300 rounded-lg overflow-hidden mt-5'>

                    <table className='w-full'>

                        <thead>
                            <tr className='border-b border-gray-300'>
                                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-800'>
                                    Company
                                </th>

                                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-800'>
                                    Job Title
                                </th>

                                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-800'>
                                    Location
                                </th>

                                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-800'>
                                    Date
                                </th>

                                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-800'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobsApplied.map((job, index) => !job.jobid ? (
                                <tr
                                    key={index}
                                    className='border-b border-gray-300 last:border-b-0'
                                >

                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={job.logo}
                                                alt={job.company}
                                                className='w-9 h-9 object-contain'
                                            />

                                            <span className='text-sm text-gray-700'>
                                                {job.company}
                                            </span>
                                        </div>
                                    </td>

                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {job.title}
                                    </td>

                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {job.location}
                                    </td>

                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {moment(job.date).format('ll')}
                                    </td>

                                    <td className='px-6 py-4'>
                                        <span
                                            className={`inline-block min-w-28 text-center px-4 py-2 rounded-md text-sm font-medium
                            ${job.status === 'Accepted'
                                                    ? 'bg-green-100 text-green-600'
                                                    : job.status === 'Rejected'
                                                        ? 'bg-red-100 text-red-500'
                                                        : 'bg-blue-100 text-blue-600'
                                                }`}
                                        >
                                            {job.status}
                                        </span>
                                    </td>

                                </tr>
                            ) : null)}
                        </tbody>

                    </table>

                </div>
            </div>
            <Footer/>

        </div>
    )
}

export default Application
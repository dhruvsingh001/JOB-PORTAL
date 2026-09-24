import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../Components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../Components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth, useUser } from '@clerk/react'
import { AppContext } from '../Context/AppContext'

const Application = () => {

    const { user } = useUser()

    const { getToken } = useAuth()

    const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

    const [edit, setedit] = useState(false)
    const [Resume, setResume] = useState(null)

    const viewResume = async () => {
        const previewWindow = window.open('', '_blank')
        if (!previewWindow) {
            toast.error('Allow pop-ups to view your resume.')
            return
        }

        try {
            const token = await getToken()
            if (!token) throw new Error('Please sign in again to view your resume.')

            const { data } = await axios.get(backendUrl + '/api/user/resume', {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            })
            const pdfUrl = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
            previewWindow.location.href = pdfUrl
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 60_000)
        } catch (error) {
            previewWindow.close()
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const updateResume = async () => {

        try {

            const formData = new FormData()
            formData.append('resume', Resume)

            const token = await getToken()

            const { data } = await axios.post(backendUrl + '/api/user/update-resume',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                await fetchUserData()
                setedit(false)
                setResume(null)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }


    console.log(userApplications)
    useEffect(() => {
        if (user) {
            fetchUserApplications()
        }
    }, [user])
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

                    {edit || !userData?.resume ? (
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
                                onClick={updateResume}
                                disabled={!Resume}
                                className='mt-6 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed'
                            >
                                Done
                            </button>

                        </div>
                    ) : (
                        <div className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
                                    <img src={assets.profile_upload_icon} alt='' className='w-6 h-6' />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Current Resume</p>
                                    <p className='font-medium text-gray-800'>Resume uploaded</p>
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
                                    onClick={() => setedit(true)}
                                    className='px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition'
                                >
                                    Replace
                                </button>
                            </div>
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
                            {userApplications.map((job, index) => (
                                <tr
                                    key={index}
                                    className='border-b border-gray-300 last:border-b-0'
                                >

                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={job.companyId.image}
                                                alt={job.companyId.name}
                                                className='w-9 h-9 object-contain'
                                            />

                                            <span className='text-sm text-gray-700'>
                                                {job.companyId.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {job.jobId.title}
                                    </td>

                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {job.jobId.location}
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
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Application

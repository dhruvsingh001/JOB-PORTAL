import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { data, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import Loading from '../Components/Loading'
import { assets } from '../assets/assets'
import moment from 'moment'
import Jobcard from '../Components/Jobcard'
import Footer from '../Components/Footer'

const Applyjobs = () => {
    const { id } = useParams()

    const [jobdata, setjobdata] = useState(null)

    const { jobs } = useContext(AppContext)

    const fetchjobs = async () => {
        const data = jobs.filter(job => job._id === id)

        if (data.length !== 0) {
            setjobdata(data[0])
            console.log(data[0])
        }
    }

    useEffect(() => {
        fetchjobs()
    }, [id, jobs])
    return jobdata ? (
        <div>
            <Navbar />
            <div className="w-4/5 mx-auto my-10 px-11 py-14 bg-blue-50 border border-blue-500 rounded-lg flex items-center gap-6">

                {/* Company Logo */}
                <div className="w-32 h-32 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                    <img
                        src={assets.company_icon}
                        alt="Company Logo"
                        className="w-20 h-20 object-contain"
                    />
                </div>

                {/* Job Information */}
                <div className="flex-1">
                    <h1 className="text-3xl font-semibold text-gray-700 mb-5">
                        {jobdata.title}
                    </h1>

                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <span>💼 Slack</span>
                        <span>📍{jobdata.location}</span>
                        <span>♙{jobdata.level}</span>
                        <span>💵 CTC:${jobdata.salary / 1000}k</span>
                    </div>
                </div>

                {/* Right Side */}
                <div className="text-center min-w-48">
                    <button className="w-full px-5 py-4 hover:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-base cursor-pointer">
                        Apply now
                    </button>

                    <p className="mt-4 text-sm text-gray-600">
                        Posted {moment(jobdata.date).fromNow()}
                    </p>
                </div>

            </div>
            <div className='flex'>
            <div className='flex flex-col p-6 px-9 gap-5 w-2/3'>
                <h1 className='text-2xl font-bold bg-blue-100 rounded-2xl px-5 py-1 w-fit'>JOB DESCRIPTION</h1>
                <div className="
            text-gray-500 leading-7 text-[15px] [&_p]:mb-8 [&_h2]:text-xl [&_h2]:font-semibold            [&_h2]:text-gray-800
            [&_h2]:mb-5 [&_h2]:mt-8 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_li]:mb-1
        " dangerouslySetInnerHTML={{ __html: jobdata.description }}></div>
                <button className="w-40 px-5 py-4 hover:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-base cursor-pointer">
                    Apply now
                </button>
            </div>
            <div className='flex flex-col gap-3 justify-end w-1/3 mx-10 px-8 mb-10 items-end'>
                {jobs.filter((job)=>job._id!==jobdata._id && job.companyId._id===jobdata.companyId._id).filter
                (job=>true).slice(0,4).map((job,index)=>{
                    return <Jobcard key={index} job={job}/>
                }) }
            </div>
            </div>
            <Footer/>
        </div>
    ) : (
        <Loading />
    )
}

export default Applyjobs
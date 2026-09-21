import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import Jobcard from './Jobcard'

const Joblisting = () => {

  const { isSearch, Searchfilter, setSearchfilter, jobs } = useContext(AppContext)

  console.log({ isSearch })
  console.log("xx", Searchfilter)

  const [currentpage, setcurrentpage] = useState(1)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])


  const filteredJobs = jobs.filter((job) => {

    // Search by title
    const titleMatch =
      Searchfilter.title === "" ||
      job.title.toLowerCase().includes(Searchfilter.title.toLowerCase())

    // Search by location
    const locationMatch =
      Searchfilter.location === "" ||
      job.location.toLowerCase().includes(Searchfilter.location.toLowerCase())

    // Search by category checkbox
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category)

    // Search by location checkbox
    const checkboxLocationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location)

    return (
      titleMatch &&
      locationMatch &&
      categoryMatch &&
      checkboxLocationMatch
    )

  })


  return (
    <div>

      <div className='flex flex-row shadow-2xl'>

        <div className='mb-6 p-7 px-14 border-r-2 shadow-[5px_0_8px_-4px_rgba(0,0,0,0.25)] border-gray-300 mt-3 w-1/3'>

          {
            isSearch &&
            (Searchfilter.title != "" || Searchfilter.location != "") &&
            (
              <div className='mt-8 ml-10'>

                <p className='text-sm font-medium text-gray-800 mb-3'>
                  Current Search
                </p>

                <div className='flex gap-3'>

                  {Searchfilter.title && (
                    <span className='flex items-center gap-2 w-fit border border-blue-200 bg-blue-50 text-gray-500 text-xs px-4 py-2 rounded-md shadow-sm'>

                      {Searchfilter.title}

                      <img
                        onClick={() => {
                          setSearchfilter(prev => ({
                            ...prev,
                            title: ""
                          }))
                        }}
                        src={assets.cross_icon}
                        className='w-3 h-3 cursor-pointer'
                        alt=''
                      />

                    </span>
                  )}

                  {Searchfilter.location && (
                    <span className='flex items-center gap-2 w-fit border border-red-200 bg-red-50 text-gray-500 text-xs px-4 py-2 rounded-md shadow-sm'>

                      {Searchfilter.location}

                      <img
                        onClick={() => {
                          setSearchfilter(prev => ({
                            ...prev,
                            location: ""
                          }))
                        }}
                        src={assets.cross_icon}
                        className='w-3 h-3 cursor-pointer'
                        alt=''
                      />

                    </span>
                  )}

                </div>

              </div>
            )
          }


          <div className='mt-7'>

            <p className='text-lg font-medium text-gray-800 mb-4'>
              Search by Categories
            </p>

            <div className='flex flex-col gap-3'>

              {JobCategories.map((category, index) => (

                <label
                  key={index}
                  className='flex items-center gap-2 hover:font-bold w-fit text-sm text-gray-500'
                >

                  <input
                    type='checkbox'
                    className='w-4 h-4'
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {

                      if (e.target.checked) {

                        setSelectedCategories(prev => [
                          ...prev,
                          category
                        ])

                      } else {

                        setSelectedCategories(prev =>
                          prev.filter(item => item !== category)
                        )

                      }

                    }}
                  />

                  {category}

                </label>

              ))}

            </div>

          </div>


          <div className='h-px bg-gray-400 mt-17'></div>


          <div className='mt-17'>

            <p className='text-lg font-medium text-gray-800 mb-4'>
              Search by Location
            </p>

            <div className='flex flex-col gap-3'>

              {JobLocations.map((category, index) => (

                <label
                  key={index}
                  className='flex items-center gap-2 hover:font-bold w-fit text-sm text-gray-500'
                >

                  <input
                    type='checkbox'
                    className='w-4 h-4'
                    checked={selectedLocations.includes(category)}
                    onChange={(e) => {

                      if (e.target.checked) {

                        setSelectedLocations(prev => [
                          ...prev,
                          category
                        ])

                      } else {

                        setSelectedLocations(prev =>
                          prev.filter(item => item !== category)
                        )

                      }

                    }}
                  />

                  {category}

                </label>

              ))}

            </div>

          </div>

        </div>


        <section className='p-9 mt-4 px-10'>

          <div
            className='text-2xl font-medium mb-2'
            id='job-list'
          >
            Latest Jobs
          </div>

          <p>
            Get your desired job from the dream company
          </p>


          <div className='mt-5 flex flex-wrap gap-12 justify-center'>

            {filteredJobs
              .slice((currentpage - 1) * 6, currentpage * 6)
              .map((job, index) => {

                return (
                  <Jobcard
                    key={index}
                    job={job}
                  />
                )

              })}

          </div>


          {filteredJobs.length > 0 && (

            <div className='flex items-center justify-center space-x-2 mt-10 gap-3'>

              {/* Previous */}

              <a href='#job-list'>

                <img
                  onClick={() => {
                    setcurrentpage(
                      Math.max(currentpage - 1, 1)
                    )
                  }}
                  src={assets.left_arrow_icon}
                  alt=''
                />

              </a>


              {/* Page numbers */}

              {Array.from({
                length: Math.ceil(filteredJobs.length / 6)
              }).map((_, index) => (

                <a
                  href='#job-list'
                  key={index}
                >

                  <button
                    onClick={() => {
                      setcurrentpage(index + 1)
                    }}
                    className={`w-8 h-8 border border-gray-300 rounded ${
                      currentpage === index + 1
                        ? 'bg-blue-200'
                        : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>

                </a>

              ))}


              {/* Next */}

              <a href='#job-list'>

                <img
                  onClick={() => {
                    setcurrentpage(
                      Math.min(
                        currentpage + 1,
                        Math.ceil(filteredJobs.length / 6)
                      )
                    )
                  }}
                  src={assets.right_arrow_icon}
                  alt=''
                />

              </a>

            </div>

          )}

        </section>

      </div>

    </div>
  )
}

export default Joblisting
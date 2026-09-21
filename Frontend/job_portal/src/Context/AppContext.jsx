
import React, { createContext, useContext, useEffect, useState } from 'react'
import { jobsData } from '../assets/assets'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [Searchfilter, setSearchfilter] = useState({
        title:"",
        location:""
    })
    const [isSearch, setisSearch] = useState(false)

    const [jobs, setjobs] = useState([])
    
    const fetchjobs =async()=>{
      setjobs(jobsData)
       
    }
    useEffect(()=>{fetchjobs()},[])

    const [RecruiterLogin, setRecruiterLogin] = useState(false)

  const value = {
    Searchfilter,setSearchfilter,
    isSearch,setisSearch,
    jobs,setjobs,
    RecruiterLogin,setRecruiterLogin
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}


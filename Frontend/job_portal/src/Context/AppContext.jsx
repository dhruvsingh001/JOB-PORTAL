
import React, { createContext, useContext, useEffect, useState } from 'react'
import { jobsData } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth, useUser } from "@clerk/react"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [Searchfilter, setSearchfilter] = useState({
        title:"",
        location:""
    })
    const [isSearch, setisSearch] = useState(false)

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const { user } = useUser()
    const { getToken } = useAuth()


    const [jobs, setjobs] = useState([])
    //usestate variable to manage the backend api and jwt token for recruiter login 
    const [companytoken, setcompanytoken] = useState(null)
    const [companyData, setcompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])
    
    // Function to Fetch Jobs 
    const fetchjobs = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/jobs')

            if (data.success) {
                setjobs(data.jobs)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    

     // Function to Fetch Company Data
    const fetchCompanyData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companytoken } })

            if (data.success) {
                setcompanyData(data.company)
                console.log(data)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

        // Function to Fetch User Data
    const fetchUserData = async () => {
        try {

            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/user/user',
                { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.user)
            } else (
                toast.error(data.message)
            )

        } catch (error) {
            toast.error(error.message)
        }
    }

    
     // Retrive Company Token From LocalStorage
    useEffect(() => {
        fetchjobs()
        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setcompanytoken(storedCompanyToken)
        }

    }, [])




     // Fetch Company token if Company Token is Available
    useEffect(() => {
        if (companytoken) {
            fetchCompanyData()
        }
    }, [companytoken])

    const [RecruiterLogin, setRecruiterLogin] = useState(false)

    // Fetch User's Applications & Data if User is Logged In
    useEffect(() => {
        if (user) {
            fetchUserData()
            
        }
    }, [user])

    
  const value = {
    Searchfilter,setSearchfilter,
    isSearch,setisSearch,
    jobs,setjobs,
    RecruiterLogin,setRecruiterLogin,
    companyData,setcompanyData,
    companytoken,setcompanytoken,
    backendUrl
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


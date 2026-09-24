import Home from './Pages/Home'
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Applyjobs from './Pages/Applyjobs'
import Application from './Pages/Application'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import Recruiterloginbox from './Components/Recruiterloginbox'
import Addjobs from './Pages/Addjobs'
import Managejobs from './Pages/Managejobs'
import Viewapplications from './Pages/Viewapplications'
import Dashboard from './Pages/Dashboard'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const {RecruiterLogin,companytoken}= useContext(AppContext)
  return (
    <div>
      {RecruiterLogin?(<Recruiterloginbox/>):(null)}
      <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/applyjobs/:id' element={<Applyjobs/>}/>
      <Route path='/applications' element={<Application/>}/>
      <Route path='/dashboard' element={<Dashboard />}>
      {companytoken?<>
      <Route path='add-jobs' element={<Addjobs/>}></Route>
      <Route path='manage-jobs' element={<Managejobs/>}></Route>
      <Route path='view-applications' element={<Viewapplications/>}></Route>
      </>:null}
      
      </Route>

    </Routes>
    </div>
  )
}

export default App
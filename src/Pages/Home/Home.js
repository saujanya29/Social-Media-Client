import React, { useEffect } from 'react'
import { axiosClient } from '../../utils/axiosClient'
import NavBar from '../../Components/navbar/NavBar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../../Redux/Slices/appConfigureSlice'

function Home() {

    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getMyInfo())
    },[dispatch])

return (
    <>

    <NavBar/>
    <div style={{marginTop : "60px"}}>
    <Outlet/> 
    </div>
      
        
</>
)
 
}
 
export default Home
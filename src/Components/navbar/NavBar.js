import React, { useRef, useState } from 'react'
import './NavBar.scss'
import Avatar from '../avatar/Avatar'
import {useNavigate} from 'react-router-dom'
import { RiLogoutCircleLine } from "react-icons/ri";
import LoadingBar from 'react-top-loading-bar'
import { setLoading } from '../../Redux/Slices/appConfigureSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';

function NavBar() {

  const navigate = useNavigate()
  const dispath = useDispatch()
  const MyProfile = useSelector((state) => state.appConfigReducer.myProfile)

  async function handleLogoutClicked(){
    try {
      // dispath(setLoading(true));
      await axiosClient.post('auth/logout');
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login')
      // dispath(setLoading(true));
    } catch (e) {
      
    }
  }

  return (

    <div className='navbar'>
     <div className="container">
      <h2 className='banner hover-link' onClick={()=> navigate('/')}>Social Media</h2>
      <div className="right-side">
        <div className="profile hover-link" onClick={() => navigate(`/profile/${MyProfile._id}`)}>
         <Avatar src={MyProfile?.avatar?.url} />
        </div>
        <div className="logout hover-link" onClick={handleLogoutClicked} >
        <RiLogoutCircleLine />
        </div>
      </div>
     </div>


    </div>
  )
}

export default NavBar
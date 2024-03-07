import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStorageManager'
import { Navigate, Outlet } from 'react-router';


function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN);
    console.log("user in require user",user);
  return (
    user? <Outlet/> : <Navigate to = '/login'/>
  )
}

export default RequireUser
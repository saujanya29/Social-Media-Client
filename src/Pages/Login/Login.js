import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss" 
import {axiosClient}from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";


function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const navigate = useNavigate()


  async function handleSubmit(e){
    e.preventDefault();
   
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
        password
    });
    // Important : storing the KEY_ACCESS_TOKEN value with access token in the local storage 
    setItem(KEY_ACCESS_TOKEN,response.result.accessToken)
    // after successful login navigate user to home page 
    navigate( '/')

    console.log("response from login page" ,response);
       
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="Login">
      <div className="login-box">
        <h1 className="heading">Login</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" className="email" id="email"  onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" className="password" id="password"  onChange={(e) => setPassword(e.target.value)}/>

          <input type="submit" className="submit" />

        </form>

        <p className="subheading">
          Do not have account? <Link to="/signup" > Sign Up </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

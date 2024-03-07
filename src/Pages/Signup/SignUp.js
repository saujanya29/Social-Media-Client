import React, { useState } from 'react'
import "./SignUp.scss"
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';


function SignUp() {


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const navigate = useNavigate()
  
  
    async function handleSubmit(e){
      e.preventDefault();
     
      try {
        const response = await axiosClient.post('/auth/signup', {
         name,
         email,
         password
      });
   
      console.log(response);
      navigate('/');
  
      } catch (error) {
        console.log(error);
      }
  
  
    }




    return (
        <div className="Signup">
          <div className="signup-box">
            <h1 className="heading">SignUp</h1>
    
            <form onSubmit={handleSubmit}>
          
             <label htmlFor="name">Name</label>
              <input type="text" className="name" id="name"  onChange={(e) => setName(e.target.value)} />


              <label htmlFor="email">Email</label>
              <input type="email" className="email" id="email"  onChange={(e) => setEmail(e.target.value)} />
    
              <label htmlFor="password">Password</label>
              <input type="password" className="password" id="password"  onChange={(e) => setPassword(e.target.value)}/>
    
              <input type="submit" className="submit" />
    
            </form>
    
            <p className="subheading">
             Already have an account? <Link to="/login" > Log In </Link>
            </p>
          </div>
        </div>
      );
}

export default SignUp
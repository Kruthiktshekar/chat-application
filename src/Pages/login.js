import React, { useState } from "react";
import { loginRoute } from "./APIRoutes";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";
import "./login.css"
const LogIn = ()=> {

  

  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  

  const navigate = useNavigate()

  const loginHandler = (e) => {

    const name = e.target.name
    if(name==='userName'){
      setUserName(e.target.value)
    }
    else if(name==='password'){
      setPassword(e.target.value)
    }
  }

  // sending login data into backend 
  const loginSubmit=(e)=>{
    e.preventDefault()
    if(loginValidation()){
      const loginData = {
        userName : userName,
        password : password
      }
      setUserName('')
      setPassword('')
      axios.post(loginRoute,loginData)
      //storing current login user detail in localStorage
      .then((res)=>{
        localStorage.setItem('chat-user',JSON.stringify(res.data) )
        
        if(res.data.token){
          navigate('/message')
        }
        else{
          alert('username or password incorrect')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  
  //validating form input
  const loginValidation = () => {
    if(userName===''){
      alert('please enter valid user name')
      return false
    }
    else if(userName.length<3){
      alert('please enter valid user name')
      return false
   }
   else if(password===''){
    alert('please enter your password')
    return false
   }
   return true
 }
  

    return(
      <div className="login-div">
        <div className="login-container">
           <h1>Please Login</h1>
          <input placeholder="Enter Your User Name" name='userName' type='text' value={userName} onChange={loginHandler}/>
          <input placeholder="Enter Your Password" name='password' type='password' value={password} onChange={loginHandler}/>
          <button type="submit" onClick={loginSubmit}>LogIn</button>
          <div className="content">
            <span>Don't have an account?</span> 
            <Link className="link" to={'/register'}>create account</Link>
          </div>
          
        </div>
      </div>
        )
}

export default LogIn
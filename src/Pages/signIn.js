import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { registerRoute } from "./APIRoutes";
import axios from 'axios'
import "./login.css"

const Register = ()=>{

    const [name,setName] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')
    
    const [user,setUser] = useState([])

    const navigate = useNavigate()
   
    // handler for form input 
    const formHandler = (e) => {
        const name = e.target.name
        if(name==='name'){
            setName(e.target.value)
        }
        else if(name==='userName'){
            setUserName(e.target.value)
        }
        else if (name==='email'){
            setEmail(e.target.value)
        }
        else if(name==='password'){
            setPassword(e.target.value)
        }
        else if(name==='confirm'){
            setConfirm(e.target.value)
        }
        
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        // storing user details in a variable and sending it into db
        if(handleValidation()){
    
            const data = {
                    name:name,
                    userName:userName,
                    email : email,
                    password : password
                }
                console.log('userdata',data)
                setName('')
                setUserName('')
                setEmail('')
                setPassword('')
                setConfirm('')
    // storing response data in a variable 
                axios.post(registerRoute,data)
                .then((res)=>{
                    let userData = [...user]
                    userData.push(res.data)
                    setUser(userData)
                    navigate('/')
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
        
    }

    //validating the form input as per condition
    
    const handleValidation = () => {
        if(password!==confirm){
            alert ('password and confirm password should be same')
            return false
        }
        else if (name.length  < 3){
            alert ('name and userName should have more than 3 characters')
            return false
        }
        else if (userName.length  < 3){
            alert ('name and userName should have more than 3 characters')
            return false
        }
        else if(password.length < 8 ){
            alert('password should be have more than 8 characters')
            return false
        }
        else if(email === ''){
            alert('please enter valid email id')
            return false
        }
        return true

    }

    

    return(
        <div className="login-div">
            <div className="sign-container">
                <h1>SignIn</h1>
                    
                <input placeholder="Enter Your Name" type='text' name="name" value={name}  onChange={formHandler}/>
                
                <input placeholder="Enter Your UserName"  type='text' name="userName" value={userName}  onChange={formHandler}></input>
                
                <input placeholder="Enter Your Email "  type='email' name="email" value={email}  onChange={formHandler}></input>
                
                <input placeholder="Enter Your Password"  type='password' name="password" value={password} onChange={formHandler}></input>
                
                <input placeholder="Enter Confirm Password"  type='password' name="confirm" value={confirm} onChange={formHandler}></input>
                <button type="submit" onClick={submitHandler}>SignIn</button>
                <div className="content">
                <span>Already have an account? <Link to='/' >LogIn</Link></span>
                </div>
                

            </div>
        </div>
    )
}

export default Register
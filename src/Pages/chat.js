import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Contact from "../Components/contact";
import '../app.css'
import ChatContainer from "../Components/chatContainer";
import Welcome from "../Components/welcome";
import {io} from "socket.io-client"
import  {host}  from "./APIRoutes";


const Chat = () => {

    const socket = useRef()

    const [contacts , setContacts] = useState([])
    const [currentUser , setCurrentUser] = useState(undefined)
    const [currentChat,setCurrentChat] = useState(undefined)
    const [isLoaded,setIsLoaded] = useState(false)

    // setting value current user from local storage 
    useEffect(()=>{
           setCurrentUser(JSON.parse(localStorage.getItem('chat-user')))
            setIsLoaded(true)     
    },[])

    //establishing connection between server socket
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host)
            socket.current.emit("add-user",currentUser.id)
        }
    },[currentUser])

    const user = currentUser
   
    //getting all the users as contacts from db except the current user
    useEffect(()=>{
        if(currentUser){
            axios.get(`http://localhost:3600/api/getAll/${currentUser.id}`)
            .then((res)=>{
                setContacts(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[currentUser])
    
    //setting value for current chat 
    const handleChat = (chat) =>{
        setCurrentChat(chat)   
    }
   
    return(

        <div className="chat-container">
         <div className="contact-container">
            <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChat}/>
         </div>
         <div className="message-container">
            {isLoaded && currentChat === undefined ? (
                <Welcome currentUser={currentUser}/>
            ) : <ChatContainer  currentUser={user} currentChat={currentChat} socket={socket}/>}
         </div>
        </div>
    )
}

export default Chat
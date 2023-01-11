import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatRecieveRoute, chatSendRoute } from "../Pages/APIRoutes";
import ChatInput from "./chatInput";

const ChatContainer = (props) => {

    const {currentChat} = props
    const {currentUser} = props
    const {socket} = props
    const navigate = useNavigate()

    const [messages,setMessages] = useState([])
    const [recivedMsg,setRecivedMsg] = useState(null)
    const scrollRef = useRef()

   


    useEffect(()=>{
        // getting  messages form db
        async function getMessage(){
            if(currentUser && currentChat){
            const response = await axios.post(chatRecieveRoute,{
                from:currentUser.id,
                to:currentChat._id
            })
            setMessages(response.data)
        }}
        getMessage()
        // eslint-disable-next-line
    },[currentChat])

    //pushing send messages to db
    const handleSend = (msg) => {
        axios.post(chatSendRoute,{
            from: currentUser.id,
            to:currentChat._id,
            message : msg
        })
        //differentiating send msg using socket
        socket.current.emit("send-msg",{
            to : currentChat._id,
            from : currentUser.id,
            messages : msg
        })

        //pushing sent msgs into a state variable
        const msgs = [...messages]
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)
    }

    //pushing all recived msgs  into a state variable
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recive",(msg)=>{
                setRecivedMsg({fromSelf:false, message:msg})
            })
        }
    })

    //shallow coping previos msgs
    useEffect(()=>{
        recivedMsg && setMessages((prev)=>[...prev,recivedMsg])
    },[recivedMsg])
   
    //for scrollbar in a chat section
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])


    //log out handler
    const logOutHandler = () => {
        localStorage.removeItem('chat-user')
        navigate('/')
    }

    return(<>
    {
      currentChat && (

        <div className="chat-main">
            <div className="header">
                <div className="user-details">
                    <div className="userName">
                        <h3>{currentChat.userName}</h3>
                    </div>
                    <div className="log-out">
                        <button onClick={logOutHandler}>Log out</button>
                    </div>
                </div>
            </div>
            <div className="chat-message">
                {
                    messages.map((msg,index)=>{
                    return(<>
                    
                        <div ref={scrollRef} >
                           <div className={`message ${msg.fromSelf ? "sended":"recived"}`} >
                            <div className="msg-content">
                                <p >{msg.message}</p>
                            </div>
                           </div>          
                       </div>
                    
                    
                    </>
                    
                    )
                    })
                }
            </div>
            <ChatInput  handleSend={handleSend} currentUser={currentUser} currentChat={currentChat}/>
        </div> 
        )
    }   
 </>
    )
}

export default ChatContainer
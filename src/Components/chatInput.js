import React, { useState } from "react"


const ChatInput = (props) => {

    const {handleSend} = props
  
    const [msg,setMsg] = useState('')
   
    //setting value for msg state
    const sendChat = (e) => {
        e.preventDefault()
        setMsg(e.target.value)
    }

    //sending msg as argument for handlesend
    const handleSubmit = (e) => {
        e.preventDefault()
        if(msg.length>0){
            handleSend(msg)  
            setMsg('')
        }
    }

   

   return(
       
            <div className="chat-input">
                <form onSubmit={handleSubmit}>
                 <input type='text' placeholder="enter your message" value={msg} onChange={sendChat}/>
                 <button  type="submit">send</button>
                </form>
            </div>
           
    )
}

export default ChatInput
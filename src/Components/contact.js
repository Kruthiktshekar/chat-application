import  { useEffect, useState } from 'react'
import Avatar from 'react-avatar';

const Contact = ({contacts,currentUser,changeChat}) => {
    const [currentUserName,setCurrentUserName] = useState(undefined)
    const [currentName,setCurrentName] = useState(undefined)
    // const [currentSelected,setCurrentSelected] = useState(undefined)
 
    //to display current user name and userName
    useEffect(()=>{
        if(currentUser){
            setCurrentName(currentUser.name)
            setCurrentUserName(currentUser.userName)
        }
    },[currentUser])

    //changing current chat in contacts
    const changeCurrentChat = (index,contact) => {
        console.log('log')
        // setCurrentSelected(index)
        changeChat(contact)
    }
    return (
    <>

        <div className='contact-user'>

          {contacts.map((contact,index)=>{
            return(
                <div className='click' key={contact._id} onClick = {()=>changeCurrentChat(index,contact)} >
                    <div>
                    <Avatar name = {contact.userName} className='avatar' />
                    
                    </div>
                    <div className='name'>
                    <h2>{contact.name}</h2>
                    <p>{contact.userName}</p>
                    </div>
                    
                    
                </div>
            )
         })}

        </div>  
        <div className='current-user'>
            <div>
            <Avatar name = {currentName} className='avatar' />
            </div>
            <div className='name'>
            <h2>{currentName}</h2>
            <p>{currentUserName}</p>
            </div>
            
        </div>


    </>
           
    )
}



export default Contact
const Welcome = (props) => {
    const {currentUser} = props
    //display welcome message before user selected contact to chat
    return(
    
        <div className='welcome'>

            <h1>Welcome {currentUser.name}, start messaging.... </h1>

        </div>
    )     
}

export default Welcome
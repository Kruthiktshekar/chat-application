import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LogIn from "./Pages/login";
import Register from "./Pages/signIn";
import Chat from "./Pages/chat"

//declaring routes for login,registration and message pages

export default function App() {
    return(
    <BrowserRouter>
      <Routes>
         <Route path="/register" element={<Register/>}/>
         <Route path="/message" element={<Chat/>}/>
         <Route path="/" element={<LogIn/>}/>
      </Routes>
    
    </BrowserRouter>

    )
}
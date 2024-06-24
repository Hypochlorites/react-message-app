//React imports 
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
//Component imports
import NavBar from "./components/NavBar"
//Page imports
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import SignUpPage from "./pages/auth/SignUpPage"
import SignInPage from "./pages/auth/SignInPage"


export default function App() {
  //State Variables 
  const [currentUser, setCurrentUser] = useState(null)


  //HTML
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {currentUser && <NavBar/>}
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path ="/" element={<HomePage currentUser={currentUser} />} />         
            <Route path ="/chat" element={<ChatPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />    
            <Route path ="/signup" element={<SignUpPage/>} />    
            <Route path ="/signin" element={<SignInPage/>} />   
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
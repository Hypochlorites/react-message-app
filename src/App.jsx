//React imports 
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Component imports
import NavBar from "./components/NavBar"
//Page imports
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import SignUpPage from "./pages/auth/SignUpPage"
import SignInPage from "./pages/auth/SignInPage"


export default function App() {
  //State Variables 
  const [user, setUser] = useState(null)

  
  //HTML
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {user && <NavBar setUser={setUser} />}
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path ="/" element={<HomePage user={user} />} />         
            <Route path ="/chat" element={<ChatPage user={user}/>} />    
            <Route path ="/signup" element={<SignUpPage/>} />    
            <Route path ="/signin" element={<SignInPage setUser={setUser}/>} />   
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
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
    <div>
      <BrowserRouter>
        <div>
          {user && <NavBar setUser={setUser} />}
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

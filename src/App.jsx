import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Component Imports
import NavBar from "./components/NavBar"
//Page imports
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import SignUpPage from "./pages/auth/SignUpPage"
import SignInPage from "./pages/auth/SignInPage"


export default function App() {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <div>
      <BrowserRouter>
        <div>
          
          {signedIn && <NavBar />}
          
          <Routes>
            <Route path ="/" element={<HomePage signedIn={signedIn} setSignedIn={setSignedIn} />} />         
            <Route path ="/chat" element={<ChatPage />} />    
            <Route path ="/signup" element={<SignUpPage />} />    
            <Route path ="/signin" element={<SignInPage />} />   
          </Routes>
        </div>
      </BrowserRouter>
    </div>

    
  )




  
}

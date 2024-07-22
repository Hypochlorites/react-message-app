//React imports 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Context imports
import { CurrentUserProvider } from "./contexts/CurrentUserContext"
//Component imports
import NavBar from "./components/NavBar"
//Page imports
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import SignUpPage from "./pages/auth/SignUpPage"
import SignInPage from "./pages/auth/SignInPage"


export default function App() {
  //HTML
  return (
    <CurrentUserProvider>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          {<NavBar/>}
          <div className="flex-grow flex flex-col">
            <Routes>
              <Route path ="/" element={<HomePage/>}/>         
              <Route path ="/chat" element={<ChatPage/>}/>    
              <Route path ="/signup" element={<SignUpPage/>}/>    
              <Route path ="/signin" element={<SignInPage/>}/>   
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </CurrentUserProvider>
  )
}
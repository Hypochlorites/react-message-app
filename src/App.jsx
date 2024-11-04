//React imports 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Context imports
import { CurrentUserProvider, useCurrentUser } from "./contexts/CurrentUserContext"
//Component imports
import NavBar from "./components/NavBar"
//Page imports
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import ProfilePage from "./pages/ProfilePage"
import SignUpPage from "./pages/auth/SignUpPage"
import SignInPage from "./pages/auth/SignInPage"

//App exportation 
export default function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CurrentUserProvider>
  )
}

//App Content
const AppContent = () => {
  //Setup
  const { currentUser } = useCurrentUser()

  //HTML
  return (
    <div className="flex flex-col min-h-screen">
        {currentUser && <NavBar/>}
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage/>}/>         
            <Route path="/chat" element={<ChatPage/>}/>    
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>    
            <Route path="/signin" element={<SignInPage/>}/>   
          </Routes>
        </div>
    </div>
  )
} 

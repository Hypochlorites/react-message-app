import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Component Imports
import NavBar from "./components/NavBar"
//Page imports
import HomePage from "./pages/HomePage"
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path ="/" element={<HomePage />} />         
            <Route path ="/chat" element={<ChatPage />} />         
          </Routes>
        </div>
      </BrowserRouter>
    </div>

    
  )




  
}

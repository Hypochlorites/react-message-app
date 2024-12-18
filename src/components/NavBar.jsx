//React imports
import { Link } from 'react-router-dom'
import { useState } from 'react'
//Firebase imports
import  { signOut } from 'firebase/auth'
import { auth } from '../../.firebaseConfig'


export default function NavBar() {
  //State Variables
  const [error, setError] = useState(null)
  
  //Functions
  const signout = async () => {
    try {
      await signOut(auth)
    } catch (e) {
      setError(`Error signing out: ${e}`)
      console.error("Error in signout:", e, e.message)
    }
  }
  

  //HTML
  return (
    <nav className="flex bg-blue-600 justify-between">
      <ul className="flex">
        <li className="p-2"> <Link to="/">Home</Link></li>
        <li className="p-2"> <Link to="/chat">Chat</Link></li>
        <li className="p-2"> <Link to="/profile">Profile</Link></li>
      </ul>
      {error && <p className="text-red-600 p-1">{error}</p> }
      <button className="p-2" onClick={signout}> Signout </button> 
    </nav>
  )  
} 

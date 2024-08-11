//React imports
import { Link } from 'react-router-dom'
import { useState } from 'react'
//Firebase imports
import  { signOut } from 'firebase/auth'
import { auth } from '../../.firebaseConfig'
//Context imports
import { useCurrentUser } from '../contexts/CurrentUserContext'


export default function NavBar() {
  //State Variables
  const [error, setError] = useState(null)
  
  //Functions
  const { currentUser } = useCurrentUser()

  const signout = () => {
    try {
      signOut(auth)
    } catch (e) {
      setError(`Error signing out: ${e}`)
      console.error("Error in signout:", e, e.message)
    }
  }
  

  //HTML
  if (currentUser) {
    return (
      <nav className="flex bg-blue-600 justify-between">
        <ul className="flex">
          <li className="p-2"> <Link to="/">Home</Link> </li>
          <li className="p-2"> <Link to="/chat">Chat</Link> </li>
        </ul>
        {error && <p className="text-red-600 p-1">{error}</p> }
        <button className="p-2" onClick={signout}> Signout </button> 
      </nav>
    )  
  } 
}
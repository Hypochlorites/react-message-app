//React imports
import { Link } from 'react-router-dom'
//Firebase imports
import  { signOut } from 'firebase/auth'
import { auth } from '../../.firebaseConfig'


export default function NavBar() {
  //Functions
  const signout = () => {
    try {
      signOut(auth)
    } catch (e) {
      //Display error to user?
      console.error("Error signing out: ", e)
    }
  }
  

  //HTML
  return (
    <nav className="flex bg-blue-200 justify-between">
      <ul className="flex">
        <li className="p-2"> <Link to="/">Home</Link> </li>
        <li className="p-2"> <Link to="/chat">Chat</Link> </li>
      </ul>
      <button className="p-2" onClick={signout}> Signout </button> 
    </nav>
  )  
}
import { Link } from 'react-router-dom'


export default function NavBar({setSignedIn}) {


  return (
    <nav className="flex bg-blue-200 justify-between">
      <ul className="flex">
        <li className="p-2"> <Link to="/">Home</Link> </li>
        <li className="p-2"> <Link to="/chat">Chat</Link> </li>
      </ul>
      <button className="p-2" onClick={() => setSignedIn(false)}> Signout </button> 

    </nav>
  )






  
}
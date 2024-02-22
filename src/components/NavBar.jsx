import { Link } from 'react-router-dom'


export default function NavBar() {


  return (
    <nav className="flex bg-blue-200">
      <ul className="flex">
        <li className="p-2"> <Link to="/">Home</Link> </li>
        <li className="p-2"> <Link to="/chat">Chat</Link> </li>
      </ul>
    </nav>
  )






  
}
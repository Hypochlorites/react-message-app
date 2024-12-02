//Context imports 
import { useCurrentUser } from "./../contexts/CurrentUserContext"
//Component imports
import FriendRequestList from '../components/HomeComponents/FriendRequestList'


export default function HomePage() {
  //Setup
  const { contextError, currentUser } = useCurrentUser()


  //HTML
  if (currentUser) {
    return (
      <div className="flex flex-grow">
        <div className="flex flex-col basis-60">
          <h1 className="font-bold bg-gray-400 p-1">Friend Requests:</h1>
          <FriendRequestList/>
        </div>
        <div className="basis-full flex flex-col">
          {contextError && <p className="text-red-600 p-1">{contextError}</p> }
        </div>
      </div>
    )
  } else {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-300 to-slate-500">
        <h1 className="font-bold text-4xl"> Create an account to chat with millions of users! </h1>
        <a href="signup"> Sign Up</a>
        <a href="signin"> Login</a>
      </div>
    )
  }  
}
//Context imports 
import { useCurrentUser } from "./../contexts/CurrentUserContext"


export default function HomePage() {
  //Functions
  const { currentUser } = useCurrentUser()


  //HTML
  if (currentUser) {
    return (
      <h1 className="font-bold"> Home </h1>
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
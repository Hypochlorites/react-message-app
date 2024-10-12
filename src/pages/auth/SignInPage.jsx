//React imports 
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
//Firebase imports 
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../.firebaseConfig'
//Context imports
import { useCurrentUser } from '../../contexts/CurrentUserContext'

export default function SignInPage() {
  //Setup
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message
  const { currentUser } = useCurrentUser()

  //State Variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  
  //Functions   
  const signIn = async (e) => {
    e.preventDefault()
    console.log('in sign in')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      if (e.code === "auth/invalid-credential") {
        setError("Incorrect email or password.")
        return 
      }
      setError(`Error signing in: ${e}`)
      console.error("Error in signIn:", e, e.message)
    }
  }

  //useEffects
  useEffect(() => {
    if (currentUser !== null && !message) {
      navigate("/")
    }
  }, [currentUser])

  
  //HTML  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold underline"> Sign In </h1>
      <form onSubmit={signIn} className="flex flex-col items-center"> 
        {message && <p className="text-red-600 p-1">{message}</p> } 
        {error && <p className="text-red-600 p-1">{error}</p> }
        <div className="p-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input 
            className="p-2 border-2 border-black rounded-md"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            onChange={(e) => { setEmail(e.target.value) }} >
          </input>
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border-2 border-black rounded-md"
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            onChange={(e) => { setPassword(e.target.value) }} > 
          </input>
        </div>
        <button type="submit" className="border-2 p-2 border-black rounded-md hover:bg-blue-200">Login</button>
      </form>
      <h1> Do not have an account? <Link className="text-blue-600" to="/signup"> Sign Up! </Link></h1>
    </div>
  )
}
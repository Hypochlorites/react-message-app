//React imports 
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
//Firebase imports 
import { doc, setDoc, query, where, getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../../../.firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
//Context imports
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function SignUpPage() {
  //Setup
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()

  //State Variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  
  //Functions
  const validateUsername = async () => {
    try {
      const q = query(collection(db, "users"), where("username", "==", username))
      const querySnap = await getDocs(q)
      return (querySnap.size===0)
    } catch (e) {
      setError(`Error validating username: ${e}`)
      console.error("Error in validateUsername:", e, e.message)
    }
  }
  
  const createAccount = async (e) => {
    e.preventDefault()
    try {
      const isUsernameValid = await validateUsername()
      if (!isUsernameValid) {
        setError("Username is already in use.")
        return 
      }
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      const userInfo = {
        id: user.uid,
        email: user.email,
        username: username,
        bio: ""
      }
      await setDoc(doc(db, "users", userInfo.id), userInfo)
      await updateProfile(auth.currentUser, { displayName: userInfo.username,
                                              photoURL: "/src/data/pfp.png"})
    } catch (e) {
      switch (e.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          setError("Email address is already in use.")
          break
        case AuthErrorCodes.WEAK_PASSWORD:
          setError("Password must be at least 6 characters.")
          break
        case AuthErrorCodes.INVALID_EMAIL:
          setError("Invalid email.")
          break
        default:
          setError(`Error creating account: ${e}`)
          console.error("Error in createAccount:", e, e.message)
      } 
    }  
  }

  //useEffects
  useEffect(() => {
    if (currentUser !== null) {
      navigate("/signin")
    }
  }, [currentUser])

  
  //HTML
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold underline"> Create an Account </h1>
      <form onSubmit={createAccount} className="flex flex-col items-center"> 
        {error && <p className="text-red-600">{error}</p> }
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
        <div className="p-2 flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border-2 border-black rounded-md"
            id="username"
            type="text"
            name="username"
            required
            onChange={(e) => { setUsername(e.target.value) }} >
          </input>
        </div>
        <button type="submit" className="border-2 p-2 border-black rounded-md hover:bg-blue-200">Sign Up</button>
      </form>
      <h1> Already have an account? <Link className="text-blue-600" to="/signin"> Login! </Link></h1>
    </div>
  )
}
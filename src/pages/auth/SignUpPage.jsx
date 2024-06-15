//React imports 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
//Firebase imports 
import { doc, setDoc} from 'firebase/firestore';
import { auth, db } from '../../../.firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignUpPage() {
  //State Variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  
  //Functions
  const navigate = useNavigate()  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      const userInfo = {
        id: user.uid,
        email: user.email,
        username: username
      }
      await setDoc(doc(db, "users", userInfo.id), userInfo)
      navigate("/signin")
    } catch (e) {
      setError(e.message)
      console.error("Error signing up: ", e)
      // more normal error messages for incorrect information 
    }  
  }


  //HTML
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold underline"> Create an Account </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center"> 
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
//React imports
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
//Firebase imports
import { updateDoc } from 'firebase/firestore'
import { updateEmail, AuthErrorCodes } from 'firebase/auth'
//Context imports
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function EmailUpdater({ setUpdateEmail }) {
  //Setup   
  const { currentUser, currentUserObj, setCurrentUserObj, currentUserRef } = useCurrentUser()
  const navigate = useNavigate()

  //State Variables 
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)

  //Functions
  const handleUpdateEmail = async (e) => {
    e.preventDefault()
    try {
      await updateEmail(currentUser, email)
      await updateDoc(currentUserRef, {email: email})
      const updatedCurrentUserObj = { ...currentUserObj, email: email}
      setCurrentUserObj(updatedCurrentUserObj)
      setUpdateEmail(false)
    } catch (e) {
        switch (e.code) {
          case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
            navigate('/signin', {
              state: { message: 'Relogin to change your email address.'}
            })
          case AuthErrorCodes.EMAIL_EXISTS:
            setError("Email address is already in use.")
            break
          case AuthErrorCodes.INVALID_EMAIL:
            setError("Invalid email.")
            break
          default:
            setError(`Error updating email: ${e}`)
            console.error("Error in handleEpdateEmail:", e, e.message)
        }
    }
  }

  const handleClick = () => {
    setUpdateEmail(false)
  }

  
  //HTML
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form onSubmit={handleUpdateEmail} className="flex flex-col bg-gray-200 border-2 rounded-lg">
            <div className="flex items-center">
                <input
                  className="font-semibold text-8xl bg-gray-400 text-center border-2 rounded-lg"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  onChange={(e) => { setEmail(e.target.value) }} >
                </input>
                <button className="bg-gray-500 rounded-lg border-2 border-black ml-2 w-16 hover:bg-green-200" type="submit"> 
                    Set Email    
                </button>
                <button onClick={handleClick} className="bg-gray-500 border-2 rounded-lg border-black ml-2 mr-2 w-16 hover:bg-red-400" type="button">
                    Cancel
                </button>
            </div>
            {error && <p className="text-red-600 bg-gray-200 text-center p-1">{error}</p> }
        </form>
    </div>
  )
}
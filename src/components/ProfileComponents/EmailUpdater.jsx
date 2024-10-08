//React imports
import {useState} from 'react'
//Firebase imports
import { updateDoc } from 'firebase/firestore'
import { updateEmail } from 'firebase/auth'
//Context imports
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function EmailUpdater(setUpdateEmail) {
  //Setup   
  const { currentUser, currentUserObj, setCurrentUserObj, currentUserRef } = useCurrentUser()

  //State Variables 
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)

  //Functions
  const updateEmail = async (e) => {
    e.preventDefault()
    try {
      await updateEmail(currentUser, email)
      await updateDoc(currentUserRef, {email: email})
      const updatedCurrentUserObj = { ...currentUserObj, email: email}
      setCurrentUserObj(updatedCurrentUserObj)
      setUpdateEmail(false)
    } catch (e) {
        switch (e.code) {
            case AuthErrorCodes.EMAIL_EXISTS:
              setError("Email address is already in use.")
              break
            case AuthErrorCodes.INVALID_EMAIL:
              setError("Invalid email.")
              break
            default:
              setError(`Error updating email: ${e}`)
              console.error("Error in updateEmail:", e, e.message)
        }
    }
  }

  const handleClick = () => {
    setUpdateEmail(false)
  }

  //HTML
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form className="flex flex-col bg-gray-200 rounded-lg" onSubmit={updateEmail}>
            <div className="flex items-center">
                <input
                 className="font-semibold text-8xl bg-gray-400 rounded-lg text-center"
                 type="text"
                 name="email"
                 onChange={(e) => { setEmail(e.target.value) }} >
                </input>
                <button className="bg-gray-500 rounded-lg border-2 border-black ml-2 w-16 hover:bg-green-200" type="submit"> 
                    Set Email    
                </button>
                <button onClick={handleClick} className="bg-gray-500 rounded-lg border-2 border-black ml-2 mr-2 w-16 hover:bg-red-400">
                    Cancel
                </button>
            </div>
            {error && <p className="text-red-600 bg-gray-100 p-1">{error}</p> }
        </form>
    </div>
  )
}
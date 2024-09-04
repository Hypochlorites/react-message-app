//React imports 
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
//Firebase imports 
import { updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
//Context imports 
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function ProfileEditor() {  
  //Setup
  const navigate = useNavigate()
  const { currentUser, currentUserObj, currentUserRef } = useCurrentUser()

  //State Variables
  const [username, setUsername] = useState(currentUser.displayName)
  const [bio, setBio] = useState(currentUserObj.bio)
  const [email, setEmail] = useState(currentUser.email)
  const [error, setError] = useState(null)
  
  //Functions
  const updatePfp = () => {
    console.log("EEEE")  
  }

  const updateUsername = async (e) => {
    e.preventDefault()
    try {
      if (username.length <= 15) {
        await updateProfile(currentUser, {displayName: username})
        navigate("/profile")
      }
    } catch (e) {
      setError(`Error updating username: ${e}`)
      console.error("Error in updateUsername:", e, e.message)
    }
  }
  
  const updateBio = async (e) => {
    e.preventDefault()
    try {
      if (bio.length <= 500) {
        await updateDoc(currentUserRef, {bio: bio})
      }
    } catch (e) {
      setError(`Error updating bio: ${e}`)
      console.error("Error in updateBio:", e, e.message)
    }
  }

  const updateEmail = (e) => {
    e.preventDefault()
    console.log(email)
  }

  const updatePassword = (e) => {
    e.preventDefault()
  }

  //HTML
  return (
    <div className="flex flex-col flex-grow bg-gray-300 justify-evenly">
      {error && <p className="text-red-600 bg-gray-100 p-1">{error}</p> }
      <div className="flex flex-col text-white bg-black items-center rounded-xl">
        <h1 className="text-5xl font-bold underline mt-2">Profile</h1>
        <div className="flex mt-2 items-center w-4/6 justify-evenly">
          <img onClick={updatePfp}
            src={currentUser.photoURL} width="200px" height="200px">
          </img>
          <form className="flex items-center" onSubmit={updateUsername}>
            <input 
              className="font-semibold text-4xl bg-gray-400 rounded-lg text-center w-3/4"
              type="text"
              name="username"
              value={username} 
              onChange={(e) => { setUsername(e.target.value) }} >
            </input>
            {(currentUser.displayName != username) && <button className="bg-gray-500 rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
          </form>
        </div>
        <form className="flex items-center w-11/12" onSubmit={updateBio}> 
          <textarea 
            className="flex-grow resize-none text-2xl bg-gray-400 rounded-lg text-center mt-4 mb-4 h-48 w-11/12"
            id="bio"
            name="bio"
            wrap="soft"
            value={bio}
            onChange={(e) => { setBio(e.target.value) }} >
          </textarea>
          {(currentUserObj.bio != bio) && <button className="bg-gray-500 rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
        </form>
      </div>
      <div className="flex flex-col text-white bg-black items-center rounded-xl">
        <h1 className="text-5xl font-bold underline mt-2">Authentication</h1>
        <div className="flex items-baseline">
          <p className="text-3xl font-semibold mt-4">{currentUser.email}</p>
          <button onClick={updateEmail} className="bg-gray-500 rounded-lg border-2 border-white ml-2 p-1 hover:bg-green-200"> Change Email </button>
        </div>          
          <button onClick={updatePassword} className="bg-gray-500 rounded-lg border-2 border-white ml-2 p-1 hover:bg-green-200 mt-2 mb-4"> Change Password </button>
      </div>
    </div>
  )
}
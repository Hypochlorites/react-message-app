//React imports 
import { useState } from 'react'
//Firebase imports 
import { updateDoc } from 'firebase/firestore'
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { storage, auth } from '../../../.firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
//Context imports 
import { useCurrentUser } from '../../contexts/CurrentUserContext'
//Component imports
import EmailUpdater from './EmailUpdater'


export default function ProfileEditor() {  
  //Setup
  const { currentUser, currentUserObj, setCurrentUserObj, currentUserRef } = useCurrentUser()

  //State Variables
  const [username, setUsername] = useState(currentUserObj.username)
  const [bio, setBio] = useState(currentUserObj.bio)
  const [updateEmail, setUpdateEmail] = useState(false)
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)
  const [error, setError] = useState(null)
  
  //Functions
  const promptFile = () => {
    document.getElementById("fileInput").click()
  }

  const updatePfp = async (e) => {
    try {
      const file = e.target.files[0]
      const fileRef = ref(storage, `profile_pics/${file.name}`)
      await uploadBytes(fileRef, file)
      const profileUrl = await getDownloadURL(fileRef)
      await updateProfile(currentUser, {photoURL: profileUrl})
    } catch (e) {
      setError(`Error updating profile picture: ${e}`)
      console.error("Error in updatePfp: ", e, e.message)
    }
  }

  const updateUsername = async (e) => {
    e.preventDefault()
    try {
      if (username.length <= 15) {
        await updateProfile(currentUser, {displayName: username})
        await updateDoc(currentUserRef, {username: username})
        const updatedCurrentUserObj = { ...currentUserObj, username: username}
        setCurrentUserObj(updatedCurrentUserObj)        
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
        const updatedCurrentUserObj = { ...currentUserObj, bio: bio}
        setCurrentUserObj(updatedCurrentUserObj)
      }
    } catch (e) {
      setError(`Error updating bio: ${e}`)
      console.error("Error in updateBio:", e, e.message)
    }
  }

  const promptPasswordUpdate = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, currentUser.email)
      setShowPasswordPopup(true)
      setTimeout(() => {
        setShowPasswordPopup(false)
      }, 3000)
    } catch (e) {
      setError(`Error updating password: ${e}`)
      console.error("Error in promptPasswordUpdate in ProfileEditor:", e, e.meesage)
    }
  }


  //HTML
  if (currentUserObj === null) {
    return (
      <p className="text-center"> Loading... </p>
    )
  }
  return (
    <div className="flex flex-col flex-grow bg-gray-300 justify-evenly">
      {error && <p className="text-red-600 bg-gray-300 p-1">{error}</p> }
      <div className="flex flex-col text-white bg-black items-center rounded-xl">
        {updateEmail && <EmailUpdater setUpdateEmail={setUpdateEmail}/>}
        <h1 className="text-5xl font-bold underline mt-2">Profile</h1>
        <div className="flex mt-2 items-center w-4/6 justify-evenly">
          <img onClick={promptFile}
            className="cursor-pointer transition-opacity duration-300 hover:opacity-75 rounded-full"
            src={currentUser.photoURL} width="200px" height="200px">
          </img>
          <input onChange={updatePfp}
            className="hidden"
            type="file"
            accept="image/*"
            id="fileInput">
          </input>
          <form className="flex flex-col" onSubmit={updateUsername}>
            <div className="flex items-center">
              <input 
                className="font-semibold text-4xl bg-gray-400 rounded-lg text-center w-3/4"
                type="text"
                name="username"
                value={username} 
                onChange={(e) => { setUsername(e.target.value) }} >
              </input>
              {(currentUserObj.username != username) && <button className="bg-gray-500 rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
            </div>
            {(username.length > 15) && <p className="text-red-600 bg-black p-1">Character limit: 15</p>}
          </form>
        </div>
        <form className="flex flex-col w-11/12" onSubmit={updateBio}> 
          <div className="flex items-center ">
            <textarea 
              className="flex-grow resize-none text-2xl bg-gray-400 rounded-lg text-center mt-4 mb-4 h-48 w-11/12"
              id="bio"
              name="bio"
              wrap="soft"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }} >
            </textarea>
            {(currentUserObj.bio != bio) && <button className="bg-gray-500 rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
          </div>
          {(bio.length > 500) && <p className="text-red-600 bg-black p-1">Character limit: 500</p>}
        </form>
      </div>
      <div className="flex flex-col text-white bg-black items-center rounded-xl">
        <h1 className="text-5xl font-bold underline mt-2">Authentication</h1>
        <div className="flex items-baseline">
          <p className="text-3xl font-semibold mt-4">{currentUser.email}</p>
          <button onClick={() => setUpdateEmail(true)} className="bg-gray-500 rounded-lg border-2 border-white ml-2 p-1 hover:bg-green-200"> Change Email </button>
        </div>          
          <button onClick={promptPasswordUpdate} className="bg-gray-500 rounded-lg border-2 border-white ml-2 p-1 hover:bg-green-200 mt-2 mb-4"> Change Password </button>
          {showPasswordPopup && <p className="bg-green-300 rounded-lg mb-4 p-2"> A password reset link has been emailed to you </p> } 
      </div>
    </div>
  )
}
//React imports 
import { useState } from 'react'
//Context imports 
import { useCurrentUser } from '../../contexts/CurrentUserContext'

export default function ProfileEditor() {  
  const { currentUser, currentUserObj } = useCurrentUser()

  //State Variables
  const [username, setUsername] = useState(currentUser.displayName)
  const [email, setEmail] = useState(currentUser.email)
  const [bio, setBio] = useState(currentUserObj.bio)
  
  //Functions
  const updatePfp = () => {
    console.log("EEEE")  
  }

  const updateUsername = (e) => {
    e.preventDefault()
    console.log(username)
  }
  
  const updateEmail = (e) => {
    e.preventDefault()
    console.log(email)
  }
  
  const updateBio = (e) => {
    e.preventDefault()
    console.log(bio)
  } 

  
  //HTML
  return (
    <div className="flex flex-col text-white bg-black items-center rounded-xl">
      <div className="flex mt-2 items-center w-4/6 justify-evenly">
        <img onClick={updatePfp}
          src={currentUser.photoURL} width="200px" height="200px">
        </img>
        <form onSubmit={updateUsername}>
          <input 
            className="font-bold text-4xl bg-gray-400 rounded-lg text-center w-3/4"
            type="text"
            value={username} 
            onChange={(e) => { setUsername(e.target.value) }} >
          </input>
          {(currentUser.displayName != username) && <button className="rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
        </form>
      </div>
      <form onSubmit={updateEmail}>
        <input 
          className="text-3xl font-semibold mt-4 bg-gray-400 rounded-lg text-center"
          type="text"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }} > 
        </input>
        {(currentUser.email != email) && <button className="rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
      </form>
      <form onSubmit={updateBio}> 
        <input 
          className="text-2xl bg-gray-400 rounded-lg text-center w-10/12  mt-4 mb-4"
          type="text"
          value={bio}
          onChange={(e) => { setBio(e.target.value) }} >
        </input>
        {(currentUserObj.bio != bio) && <button className="rounded-lg border-2 border-white ml-2 w-16 hover:bg-green-200" type="submit"> Save </button>}
      </form>
    </div>
  )
}
//Context imports 
import { useCurrentUser } from '../contexts/CurrentUserContext'


export default function ProfileBar({ setShowBar }) {  
  //Setup
  const { currentUser, currentUserObj } = useCurrentUser()

  
  //HTML
  return (
    <div className="fixed inset-0 bg-opacity-50 z-50
    flex flex-col text-white bg-black items-center rounded-xl">
      <div className="flex mt-2 items-center w-4/6 justify-between">
        <img src={currentUser.photoURL} width="200px" height="200px"></img>
        <h1 className="font-bold text-4xl"> {currentUser.displayName} </h1>
      </div>
      <p className="text-3xl font-semibold mt-4"> {currentUser.email} </p>
      <p className="text-2xl bg-gray-400 w-10/12 rounded-lg text-center mt-4 mb-4"> {currentUserObj.bio} </p>
      <p onClick={() => setShowBar(false)}>X</p>
    </div>
  )
}
//Context imports 
import { useCurrentUser } from '../contexts/CurrentUserContext'

export default function ProfileBar() {  
  //Functions
  const { currentUser, currentUserObj } = useCurrentUser()
  
  
  //HTML
  if  (currentUser && currentUserObj) {
    return (
      <div className="flex flex-col text-white bg-black items-center rounded-xl">
        <div className="flex mt-2 items-center w-4/6 justify-between">
          <img src={currentUser.photoURL} width="200px" height="200px"></img>
          <h1 className="font-bold text-4xl"> {currentUser.displayName} </h1>
        </div>
        <p className="text-3xl font-semibold"> {currentUser.email} </p>
        <p className="text-2xl"> {currentUserObj.bio} </p>
      </div>
    )
  } else {
    return (
      <p className="text-center"> Loading... </p>
    )
  }
}
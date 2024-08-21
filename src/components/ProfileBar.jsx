//Context imports 
import { useCurrentUser } from '../contexts/CurrentUserContext'


export default function ProfileBar() {  
  //Functions
  const { currentUser, currentUserObj } = useCurrentUser()
  
  //HTML
  if  (currentUser && currentUserObj) {
    return (
      <div>
        <div>
          <img></img>
          <h1> {currentUser.displayName} </h1>
        </div>
        <p> {currentUser.email} </p>
        <p> {currentUserObj.bio} </p>
      </div>
    )
  } else {
    return (
      <p className="text-center"> Loading... </p>
    )
  }
}
//React imports
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
//Context imports
import { useCurrentUser } from '../contexts/CurrentUserContext'
//Component imporst
import ProfileEditor from '../components/ProfileComponents/ProfileEditor'


export default function ProfilePage () {
  //Setup
  const navigate = useNavigate()
  const { contextError, currentUser, currentUserObj } = useCurrentUser()

  //useEffects
  useEffect(() => {
    if (currentUser === null) {
      navigate("/signin")
    }
  }, [currentUser])

  
  //HTML
  if (currentUser && currentUserObj) {
    return (
      <div className="flex flex-col flex-grow bg-gray-300 items-center">
        {  contextError && <p className="text-red-600 bg-gray-300 p-1">{contextError}</p> }
          <div className="flex flex-col flex-grow w-8/12">
            <ProfileEditor/>
          </div>
      </div>
    )
  } else {
    return (
      <p className="text-center"> Loading... </p>
    )
  }
}
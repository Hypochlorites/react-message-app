//React imports
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
//Context imports
import { useCurrentUser } from '../contexts/CurrentUserContext'
//Component imporst
import ProfileEditor from '../components/ProfileComponents/ProfileEditor'


export default function ProfilePage () {
  //Functions
  const navigate = useNavigate()

  const { currentUser } = useCurrentUser()

  //useEffects
  useEffect(() => {
    if (currentUser === null) {
      navigate("/signin")
    }
  }, [currentUser])

  
  //HTML
  if (currentUser) {
    return (
      <div className="flex flex-grow bg-gray-300 justify-center">
        <div className="mt-4 basis-3/4">
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
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
      <div className="flex flex-col flex-grow bg-gray-300 items-center">
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
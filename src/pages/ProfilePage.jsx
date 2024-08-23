//React imports
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
//Context imports
import { useCurrentUser } from '../contexts/CurrentUserContext'
//Component imporst
import ProfileBar from '../components/ProfileBar'


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
  return (
    <div className="flex-grow bg-gray-400">

      <div className=" mt-4">
         <ProfileBar/>
      </div>
    </div>
    )
}
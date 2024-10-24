//React imports
import { useState, useRef} from 'react'
//Component imports
import ProfileBar from '../ProfileComponents/ProfileBar'


export default function Message({message, isIncoming, timestamp, otherUser, currentUser}) {
  //Setup 
  const profileBarRefs = useRef({})

  //State Variables 
  const [showProfileBar, setShowProfileBar] = useState(false)
  const [profileBarPosition, setProfileBarPosition] = useState({ top: 0, right: 0})

  //Functions
  const promptProfileBar = (ref) => {
    const rect = profileBarRefs[ref].getBoundingClientRect()
    setProfileBarPosition({top: rect.top, right: rect.right})
    setShowProfileBar(true)
  }

  //HTML
  return (
    <div className={`rounded-lg w-fit mt-4 p-2 ${!isIncoming? `bg-green-300 items-end ml-auto mr-2` : `bg-blue-200 items-start ml-2`}`}>
      <div className="flex">
          <img onClick={isIncoming? () => promptProfileBar("pfp"): undefined} className={`rounded-full mr-2 ${isIncoming? `cursor-pointer` : ``}`} 
            src={isIncoming? otherUser.photoURL : currentUser.photoURL} 
            width="50px" height="50px"
            ref={(element) => (profileBarRefs["pfp"]) = element}>
          </img>
        <div className="flex flex-col">
          <div className="flex items-center">
            {isIncoming ? (<p onClick={() => promptProfileBar("username")} ref={(element) => (profileBarRefs["username"]) = element} className="mr-2 font-semibold text-lg cursor-pointer">{otherUser.username}</p>) : (<p className="mr-2 font-semibold text-lg">{currentUser.displayName}</p>) }
            <p className="text-xs">{timestamp}</p>
          </div>
          <p>{message}</p>
        </div>
        {showProfileBar && <ProfileBar 
                      setShowProfileBar={setShowProfileBar}
                      position={profileBarPosition}
                      photoURL={otherUser.photoURL}
                      username={otherUser.username}
                      bio={otherUser.bio}
                    />}
      </div>
    </div>
  )
}
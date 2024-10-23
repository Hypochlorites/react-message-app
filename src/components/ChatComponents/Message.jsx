//React imports
import { useState} from 'react'
//Component imports
import ProfileBar from '../ProfileComponents/ProfileBar'


export default function Message({message, isIncoming, timestamp, otherUser, currentUser}) {
  //State Variables 
  const [showBar, setShowBar] = useState(false)


  //HTML
  return (
    <div className={`rounded-lg w-fit mt-4 p-2 ${!isIncoming? `bg-green-300 items-end ml-auto mr-2` : `bg-blue-200 items-start ml-2`}`}>
      <div className="flex">
          <img onClick={isIncoming? () => setShowBar(true) : undefined} className="rounded-full mr-2" src={isIncoming? otherUser.photoURL : currentUser.photoURL } width="50px" height="50px"></img>
        <div className="flex flex-col">
          <div className="flex items-center">
            {isIncoming ? (<p onClick={() => setShowBar(true)} className="mr-2 font-semibold text-lg">{otherUser.username}</p>) : (<p className="mr-2 font-semibold text-lg">{currentUser.displayName}</p>) }
            <p className="text-xs">{timestamp}</p>
          </div>
          <p>{message}</p>
        </div>
        {showBar && <ProfileBar 
                      setShowBar={setShowBar}
                      photoURL={otherUser.photoURL}
                      username={otherUser.username}
                      bio={otherUser.bio}
                    />}
      </div>
    </div>
  )
}
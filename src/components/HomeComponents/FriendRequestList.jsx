//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { collection, getDocs } from 'firebase/firestore'
//Context imports 
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function FriendRequestList() {
  //Setup
  const { currentUserRef } = useCurrentUser()
  
  //State Variables
  const [friendRequests, setFriendRequests] = useState(null)
  const [error, setError] = useState(null)

  //useEffects 
  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const friendRequestSnaps = await getDocs(collection(currentUserRef, "friendRequests"))
        const friendRequests = friendRequestSnaps.docs.map(doc => ({...doc.data()}))
        setFriendRequests(friendRequests)
      } catch (e) {
        setError(`Error getting friend requests: ${e}`)
        console.error("Error in getFriendRequests:", e, e.message)
      }
    }
    if (currentUserRef) {
      getFriendRequests()
    }
  }, [currentUserRef])


  //HTML
  return (
    <div className="basis-full bg-gray-400">
      <div>
        { error ? (
          <p className="text-red-600 p-1">{error}</p>
        ) : (
          <div>
            { friendRequests === null ? (
              <p className="p-1"> Loading... </p>
            ) : (
              <ul className="flex flex-col divide-y">
                {friendRequests.map((friendRequest, id) => (
                  <li key={id}>
                    <div>
                      <h1 className="text-lg font-bold"> {friendRequest.requesterUsername} </h1>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
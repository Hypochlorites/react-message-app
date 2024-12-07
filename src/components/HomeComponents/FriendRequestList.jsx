//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { collection, getDocs, query, where, deleteDoc } from 'firebase/firestore'
//Context imports 
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function FriendRequestList() {
  //Setup
  const { currentUserRef } = useCurrentUser()
  
  //State Variables
  const [friendRequests, setFriendRequests] = useState(null)
  const [error, setError] = useState(null)

  //Functions
  const rejectRequest = async (friendRequest) => {
    try {
      const friendRequestsRef = collection(currentUserRef, "friendRequests")
      const q = query(friendRequestsRef, where("requesterId", "==", friendRequest.requesterId))
      const querySnapshot = await getDocs(q)
      const requestRef = querySnapshot.docs[0].ref
      await deleteDoc(requestRef)
      setFriendRequests((prevFriendRequests) => prevFriendRequests.filter((request) => request.requesterId == friendRequest.requesterId))
    } catch (e) {
      setError(`Error rejecting request: ${e}`)
      console.error("Error in rejectRequest: ", e, e.message)
    }
  }

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
                  <li className="p-1 " key={id}>
                    <div className="flex flex-col items-center">
                      <h1 className="text-lg font-semibold"> {friendRequest.requesterUsername} </h1>
                      <div className="flex justify-evenly w-full">
                        <button className="bg-gray-400 rounded-lg border-2 border-black hover:bg-green-200 p-1"> Accept </button>
                        <button onClick={() => rejectRequest(friendRequest)}className="bg-gray-400 border-2 rounded-lg border-black hover:bg-red-400 p-1"> Reject </button>
                      </div>
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
//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { collection, getDocs } from 'firebase/firestore'
//Context imports 
import { useCurrentUser } from '../../contexts/CurrentUserContext'


export default function friendList({friendList, setFriendList}) {
  //Setup
  const { currentUserRef } = useCurrentUser()

  //State Varaibles
  const [error, setError] = useState(null)

  //useEffects
  useEffect(() => {
    const getFriendList = async () => {
      try {
        const friendListSnap = await getDocs(collection(currentUserRef, "Friends"))
        const friendList = friendListSnap.docs.map(doc => ({...doc.data()}))
        setFriendList(friendList)
      } catch (e) {
        setError(`Error getting friendlist`)
        console.error("Error in getFriendList:", e, e.message)
      }
    }
    if (currentUserRef) {
      getFriendList()
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
            { friendList === null ? (
              <p className="p-1"> Loading... </p>
            ) : (
              <ul className="flex flex-col divide-y">
                {friendList.map((friend, id) => (
                  <li className="p-1" key={id}>
                    <h1 className="text-lg font-semibold"> {friend.username} </h1>
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
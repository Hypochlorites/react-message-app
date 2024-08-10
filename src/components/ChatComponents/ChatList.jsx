//React imports
import { useState, useEffect, memo } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
//Context imports
import { useCurrentUser } from '../../contexts/CurrentUserContext'
//Component imports 
import ChatListItem from './ChatListItem'


const ChatList = memo(({selectedDialogue, setSelectedDialogue, dialogues}) => {
  //State Variables
  const [usernames, setUsernames] = useState(null)
  const [error, setError] = useState(null)

  //Functions
  const { currentUser } = useCurrentUser()
  
  const getOtherUsername = async (dialogue) => {
    try {
      const otherUser_id = (dialogue.user1 === currentUser.uid) ? dialogue.user2 : dialogue.user1
      const otherUserRef = doc(db, "users", otherUser_id)
      const otherUserSnap = await getDoc(otherUserRef)
      const otherUserObj = otherUserSnap.data()
      return otherUserObj.username
    } catch (e) {
      setError(`Error getting other username: ${e}`)
      console.error("Error in getOtherUsername:", e, e.message)
    }
  }
  
  //useEffects
  useEffect(() => {
    const getUsernames = async (dialogues) => {
      try {
        const usernamePromises = dialogues.map(async (dialogue) => {
          const username =  await getOtherUsername(dialogue)
          return {id: dialogue.id, username}
        })
        const usernameResponses = await Promise.all(usernamePromises)
        const usernames = usernameResponses.reduce((acc, {id, username}) => {
          acc[id] = username
          return acc
        }, {})        
        setUsernames(usernames)
      } catch (e) {
        setError(`Error getting usernames: ${e}`)
        console.error("Error in getUsernames:", e, e.message)
      }
    }
    getUsernames(dialogues)
  }, [dialogues])

  
  //HTML 
  return (
    <div className="basis-full bg-gray-400">
      <div>
        { error ? (
          <p className="text-red-600 p-1">{error}</p>
        ) : (
          <div>
            { usernames === null ? (
              <p className="p-1"> Loading... </p>
            ) : (
              <ul className="flex flex-col divide-y">
                {dialogues.map((dialogue, id) => (
                  <li key={id} onClick={() => {setSelectedDialogue(dialogue.id)}}> 
                    <ChatListItem 
                      username={usernames[dialogue.id]} 
                      lastMessage={dialogue.lastMessage}
                      selected={selectedDialogue === dialogue.id}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

ChatList.displayName = "ChatList"
export default ChatList
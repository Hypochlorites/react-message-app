//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { collection, getDocs } from 'firebase/firestore'
//Component imports 
import ChatListItem from './ChatListItem'


export default function ChatList({currentUser, selectedDialogue, setSelectedDialogue, getUserData}) {
  //State Variables
  const [chats, setChats] = useState(null)
  const [error, setError] = useState(null)
  
  //useEffects
  useEffect(() => {
    const getChats = async () => {
      try {
        const currentUserData = await getUserData(currentUser.uid)
        const data = await getDocs(collection(currentUserData.userRef, "chats"))
        const chats = data.docs.map(doc => ({...doc.data()}))
        setChats(chats)
      } catch (e) {
        setError(e.message)
        console.error("Error getting chats:", e)
      }
    }
    getChats()
  }, [])

  
  //HTML 
  return (
    <div className="basis-full bg-gray-400">
      <div>
        { error ? (
          <p className="text-red-600 p-1">{error}</p>
        ) : (
          <div>
            { chats === null ? (
              <p className="p-1"> Loading... </p>
            ) : (
              <ul className="flex flex-col divide-y">
                {chats.map((chat, id) => (
                  <li key={id} onClick={() => {setSelectedDialogue(chat.dialogue_id)}}> 
                    <ChatListItem 
                      username={chat.otherUser}
                      lastMessage={.lastMessage}
                      selected={selectedDialogue === chat.dialogue_id}
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
}
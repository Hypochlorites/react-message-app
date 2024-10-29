//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
//Context imports
import { useCurrentUser } from '../../contexts/CurrentUserContext'
//Component imports 
import Message from './Message'


export default function ChatHistory({selectedDialogue, messages, setMessages}) {
  //Setup 
  const { currentUser } = useCurrentUser()

  //State Variables 
  const [otherUser, setOtherUser] = useState(null)
  const [error, setError] = useState(null)

  //Functions
  const dateCheck = (timestamp) => {
    const today = new Date()
    if (timestamp.getMonth() == today.getMonth() && timestamp.getFullYear() == today.getFullYear()) { 
      if (timestamp.getDate() == today.getDate()) {
        return "today"
       }
      today.setDate(today.getDate()-1)
      if (timestamp.getDate() === today.getDate()) {
        return "yesterday"
      } 
    }  
  }
  
  const formatDate = (timestamp) => {
    try {
      const date = timestamp.toDate()
      const optionsTime = { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
      }
      if (dateCheck(date) == "today") {
        return "Today at " + date.toLocaleTimeString('en-US', optionsTime)
      }
      if (dateCheck(date) == "yesterday") {
        return "Yesterday at " + date.toLocaleTimeString('en-US', optionsTime)
      }
      const optionsDate = { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric',
      }
      return date.toLocaleDateString('en-US', optionsDate) + ' ' + date.toLocaleTimeString('en-US', optionsTime)
    } catch (e) {
      setError(`Error formatting date: ${e}`)
      console.error("Error in formatDate:", e, e.message)
    }
  }

  const getMessages = async (dialogueRef) => {
    try {
      const messageSnaps = await getDocs(collection(dialogueRef, "messages"))
      const messages = messageSnaps.docs.map(doc => ({...doc.data()}))
      const sortedMessages = messages.sort((a, b) => a.timeStamp - b.timeStamp)
      setMessages(sortedMessages)
    } catch (e) {
      setError(`Error getting messages: ${e}`)
      console.error("Error in getMessages:", e, e.message)
    }
  }

  const getOtherUser = async (dialogue) => {
    try {
      const user_id = (dialogue.user1 === currentUser.uid) ? dialogue.user2 : dialogue.user1
      const userRef = doc(db, "users", user_id)
      const userSnap = await getDoc(userRef)
      const userObj = userSnap.data()
      setOtherUser(userObj)
    } catch (e) {
      setError(`Error getting other user's data: ${e}`)
      console.error("Error in getOtherUser in ChatHistory", e, e.message)
    }
  }
  
  //useEffects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dialogueRef = doc(db, "dialogues", selectedDialogue)
        const dialogueSnap = await getDoc(dialogueRef)
        const dialogue = dialogueSnap.data()
        await getMessages(dialogueRef) 
        await getOtherUser(dialogue)
      } catch (e) {
        setError(`Error fecthing dialogues: ${e}`)
        console.error("Error is fetchData:", e, e.message)
      }
    }
    if (selectedDialogue) {
      fetchData()
    } else {
      setMessages([])
    }
  }, [selectedDialogue])
  
  
  //HTML
  return (
    <div className="basis-full bg-gray-100">
      { error ? (
        <p className="text-red-600 p-1">{error}</p>
      ) : (
        <div> 
          {(otherUser === null) ? (
            <p className="p-1 text-8xl text-center"> Select a user to chat with. </p>
          ) : (
            <div>
              {(messages === null) ? (
                <p className="p-1"> Loading... </p>
              ): (
                <ul>
                  {messages.map((message, id) => (
                    <li key={id}>
                      <Message 
                        message={message.message}
                        isIncoming={message.from !== currentUser.uid}
                        timestamp={formatDate(message.timeStamp)}
                        otherUser={otherUser}
                        currentUser={currentUser}
                      />
                    </li>
                  ))}
                </ul> 
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
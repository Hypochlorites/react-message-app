//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { collection, doc, getDocs } from 'firebase/firestore'
//Component imports 
import Message from './Message'


export default function ChatHistory({currentUser, selectedDialogue, messages, setMessages}) {
  //State Variables 
  const [error, setError] = useState(null)
  
  //useEffects
  useEffect(() => {
    const getMessages = async () => {
      try {
        const dialogueRef = doc(db, "dialogues", selectedDialogue)
        const messageSnaps = await getDocs(collection(dialogueRef, "messages"))
        const messages = messageSnaps.docs.map(doc => ({...doc.data()}))
        const sortedMessages = messages.sort((a, b) => a.timeStamp - b.timeStamp)
        setMessages(sortedMessages)
      } catch (e) {
        setError(`Error getting messages: ${e}`)
        console.error("Error in getMessages:", e, e.message)
      }
    }
    if (selectedDialogue) {
      getMessages()
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
          {messages === null ? (
            <p className="p-1"> Loading... </p>
          ): (
            <ul>
              {messages.map((message, id) => (
                <li key={id}>
                  <Message 
                    message={message}
                    isIncoming={message.from !== currentUser.uid}
                  />
                </li>
              ))}
            </ul> 
          )}
        </div>
      )}
    </div>
  )
}
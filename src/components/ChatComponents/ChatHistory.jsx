//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { collection, doc, getDocs } from 'firebase/firestore'
//Component imports 
import Message from './Message'


export default function ChatHistory({currentUser, selectedDialogue}) {
  //State Variables 
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(null)
  
  //useEffects
  useEffect(() => {
    const getMessages = async () => {
      try {
        const dialogueRef = doc(db, "dialogues", selectedDialogue)
        const data = await getDocs(collection(dialogueRef, "messages"))
        const messages = data.docs.map(doc => ({...doc.data()}))
        setMessages(messages)
      } catch (e) {
        setError(e.message)
        console.error("Error getting messages:", e)
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
        <p className="text-red-600">{error}</p>
      ) : (
        <div>
          {messages === null ? (
            <p className="p-1"> Loading... </p>
          ): (
            <ul>
              {messages.map((message, id) => (
                <li key={id}>
                  <Message 
                    message={message.message}
                    isIncoming={message.from !== currentUser.uid}
                    timeStamp ={message.timeStamp}
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
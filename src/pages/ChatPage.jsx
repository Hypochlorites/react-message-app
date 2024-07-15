//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Firebase imports 
import { db } from '../../.firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../.firebaseConfig'
import { collection, doc, addDoc, getDoc, getDocs, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'
import UserList from '../components/ChatComponents/UserList'


export default function ChatPage({currentUser, setCurrentUser}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [startNewChat, setStartNewChat] = useState(false)
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(null)  

  //Functions
  const navigate = useNavigate()
  
  const createDialogue = async (otherUser_id) => {
    try {
      const newDialogue = doc(collection(db, "dialogues"))
      await setDoc(newDialogue, {
        user1: currentUser.uid,
        user2: otherUser_id,
        id: newDialogue.id,
        lastMessage: ""
      }) 
      setStartNewChat(false)
      setSelectedDialogue(newDialogue.id)
    } catch (e) {
      setError(e.message)
      console.error("Error creating dialogue:", e)
    }
  }
  
  const sendMessage = async (toSend) => {
    try {
      const dialogueRef = doc(db, "dialogues", selectedDialogue)
      const newMessage = collection(dialogueRef, "messages")
      const messageData = {
        from: currentUser.uid,
        message: toSend,
        timeStamp: Timestamp.fromDate(new Date()) 
      }
      await addDoc(newMessage, messageData)
      await updateDoc(dialogueRef, {
        lastMessage: toSend
      })
      setMessages([...messages, messageData])
    } catch (e) {
      setError(e.message)
      console.error("Error sending message:", e)
    }
  }
  
  //useEffects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
        navigate('/signin')
      }
    })
    return () => unsubscribe()
  }, [])

  
  //HTML
  if (currentUser) {
    return (
      <div className="flex flex-grow">
        <div className="flex flex-col basis-60">
          <button 
            className="bg-gray-500 font-bold" 
            onClick={() => {setStartNewChat(!startNewChat)}} >
            {startNewChat ? "-" : "+"} 
          </button>
          {!startNewChat ? (
            <ChatList 
              currentUser={currentUser}
              selectedDialogue={selectedDialogue}
              setSelectedDialogue={setSelectedDialogue}
              messages={messages}
            />
          ) : (
            <UserList 
              currentUser={currentUser}
              createDialogue={createDialogue}
            />
          )} 
        </div>
        <div className="basis-full flex flex-col justify-content: space-between">
          {error && <p className="text-red-600 bg-gray-100 p-1">{error}</p> }
          <ChatHistory
            currentUser={currentUser}
            selectedDialogue={selectedDialogue}
            messages={messages}
            setMessages={setMessages}
          />
          {selectedDialogue && <MessageInput sendMessage={sendMessage}/> }
        </div>
      </div> 
    )
  } else {
    return (
      <p> Loading... </p>
    )
  }
}
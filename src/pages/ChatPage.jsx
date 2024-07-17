//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Firebase imports 
import { db } from '../../.firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../.firebaseConfig'
import { collection, doc, addDoc, setDoc, updateDoc, Timestamp, query, where, or, getDocs } from 'firebase/firestore'
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
  const [dialogues, setDialogues] = useState(null)
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
      setError(`Error creating dialogue: ${e}`)
      console.error("Error in createDialogue", e, e.message)
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
      setError(`Error sending message: ${e}`)
      console.error("Error in sendMessage:", e, e.message)
    }
  }
  
  //useEffects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setCurrentUser(user)
        } else {
          setCurrentUser(null)
          navigate('/signin')
        }
      } catch (e) {
        setError(`Error checking user auth: ${e}`)
        console.error("Error in onAuthStateChanged:", e, e.message)
      } 
    })
    return () => {
      try {
        unsubscribe()
      } catch (e) {
        console.error("Error unsubscribing from onAuthStateChanged:", e, e.message)
      }
    }
  }, [])

  useEffect(() => {
    const getDialogues = async () => {
      try {
        const dialoguesRef = collection(db, "dialogues")
        const q = query(dialoguesRef, or(where("user1", "==", currentUser.uid), where("user2", "==", currentUser.uid)))
        const dialogueSnaps = await getDocs(q)
        const dialogues = dialogueSnaps.docs.map(doc => ({ ...doc.data() }))
        setDialogues(dialogues)
      } catch (e) {
        setError(`Error getting dialogues: ${e}`)
        console.error("Error in getDialogues:", e, e.message)
      }
    }
    if (currentUser) {
      getDialogues()
    }
  }, [messages, currentUser])
  
  
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
              dialogues={dialogues}
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
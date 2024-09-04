//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
//Firebase imports 
import { db } from '../../.firebaseConfig'
import { collection, doc, addDoc, setDoc, updateDoc, Timestamp, query, where, or, onSnapshot } from 'firebase/firestore'
//Context imports
import { useCurrentUser } from '../contexts/CurrentUserContext'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'
import UserList from '../components/ChatComponents/UserList'


export default function ChatPage() {
  //Setup
  const navigate = useNavigate()
  const { currentUser, contextError } = useCurrentUser()
  
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [startNewChat, setStartNewChat] = useState(false)
  const [messages, setMessages] = useState(null)
  const [dialogues, setDialogues] = useState(null)
  const [error, setError] = useState(null)  

  //Functions
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

  const memoizedDialogues = useMemo(() => dialogues, [dialogues])
  
  //useEffects
  useEffect(() => {
    if (currentUser === null) {
      navigate("/signin")
    }
  }, [currentUser])
  
  useEffect(() => {
    try {
      const dialoguesRef = collection(db, "dialogues");
      const q = query(dialoguesRef, or(where("user1", "==", currentUser.uid), where("user2", "==", currentUser.uid)))
      const unsubscribeDialogues = onSnapshot(q, (snapshot) => {
        const dialogues = snapshot.docs.map(doc => ({ ...doc.data() }));
        setDialogues(dialogues)
      })
      return () => unsubscribeDialogues()                                  
    } catch (e) {
      setError(`Error getting dialogues: ${e}`)
      console.error("Error in getDialogues useEffect:", e, e.message)
    }
  }, [])
  

  //HTML
  if (currentUser && dialogues) {
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
              selectedDialogue={selectedDialogue}
              setSelectedDialogue={setSelectedDialogue}
              dialogues={memoizedDialogues}
            />
          ) : (
            <UserList 
              dialogues={memoizedDialogues}
              createDialogue={createDialogue}
            />
          )} 
        </div>
        <div className="basis-full flex flex-col">
          {contextError && <p className="text-red-600 bg-gray-100 p-1">{contextError}</p> }
          {error && <p className="text-red-600 bg-gray-100 p-1">{error}</p> }
          <ChatHistory
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
      <p className="text-center"> Loading... </p>
    )
  }
}


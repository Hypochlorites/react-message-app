//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Firebase imports 
import { db } from '../../.firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../.firebaseConfig'
import { collection, doc, addDoc, getDocs, setDoc, query, where } from 'firebase/firestore'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'
import UserList from '../components/ChatComponents/UserList'


export default function ChatPage({currentUser, setCurrentUser}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [startNewChat, setStartNewChat] = useState(false)
  const [chats, setChats] = useState(null)
  const [dialogues, setDialogues] = useState(null)
  const [error, setError] = useState(null)

  //Functions
  const navigate = useNavigate()

  const sendMessage = (message) => {
    console.log(message)
  }

  const createChat = async (user, dialogue_id, otherUser) => {
    try {
      const newChat = collection(user, "chats")
      await addDoc(newChat, {
        dialogue_id: dialogue_id,
        otherUser: otherUser,
        lastMessage: ""
      })
    } catch (e) {
      setError(e.message)
      console.error("Error creating chat:", e)
    }
  }
  
  const createDialogue = async (otherUser_id) => {
    try {
      const otherUser = doc(db, "users", otherUser_id)
      const newDialogue = doc(collection(db, "dialogues"))
      await setDoc(newDialogue, {
        user1: currentUser.id,
        user2: otherUser.id,
        id: newDialogue.id 
      })
      createChat(currentUser, newDialogue.id, otherUser)
      createChat(otherUser, newDialogue.id, currentUser)
    } catch (e) {
      console.log(e)
      setError(e.message)
      console.error("Error creating dialogue:", e)
    }
    
  }



  //useEffects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid)
        setCurrentUser(userRef)
      } else {
        setCurrentUser(null)
        navigate('/signin')
      }
    })
    return () => unsubscribe()
  }, [])

  // useEffect(() => {
  //   const getChats = async () => {
  //     try {
  //       const data = await getDocs(collection(currentUser, "chats"))
  //       const chats = data.docs.map(doc => ({...doc.data()}))
  //       setChats(chats)    
  //     } catch (e) {
  //       setError(e.message)
  //       console.error("Error getting chats:", e)
  //     }
  //   }
  //   const getDialogues = async () => {
  //     try {
  //       const q = query(collection(db, "dialogues"), where('id', 'in', chats.map(chat => (chat.dialogue_id))))
  //       const data = await getDocs(q)
  //       const dialogues = data.docs.map(doc => ({...doc.data()}))
  //       setDialogues(dialogues)
  //     } catch (e) {
  //       setError(e.message)
  //       console.error("Error getting dialogues:", e)
  //     }
  //   }
  //   getChats()
  //   getDialogues()
  // }, [])

  
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
              selectedDialogue={selectedDialogue}
              setSelectedDialogue={setSelectedDialogue}
              chats={chats}
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
          />
          <MessageInput 
            sendMessage={sendMessage}  
          />
        </div>
      </div> 
    )
  } else {
    return (
      <p> Loading... </p>
    )
  }
  
}
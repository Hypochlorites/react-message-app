//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Firebase imports 
import { db } from '../../.firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../.firebaseConfig'
import { collection, doc, addDoc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'
import UserList from '../components/ChatComponents/UserList'


export default function ChatPage({currentUser, setCurrentUser}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [startNewChat, setStartNewChat] = useState(false)
  const [chats, setChats] = useState([])
  const [dialogues, setDialogues] = useState([])
  const [error, setError] = useState(null)

  //Functions
  const navigate = useNavigate()

  const sendMessage = (message) => {
    console.log(message)
  }

  const getUserData = async (user_id) => {
    try {
      const userRef = doc(db, "users", user_id)
      const userSnap = await getDoc(userRef)
      const userObj = userSnap.data()
      return {userRef, userObj}
    } catch (e) {
      setError(e.message)
      console.error("Error getting user data:", e)
    }
  }
  
  const createDialogue = async (otherUser_id) => {
    try {
      const newDialogue = doc(collection(db, "dialogues"))
      await setDoc(newDialogue, {
        user1: currentUser.uid,
        user2: otherUser_id,
        id: newDialogue.id 
      }) 
      return(newDialogue.id)
    } catch (e) {
      setError(e.message)
      console.error("Error creating dialogue:", e)
    }
  }

  const createChat = async (user, dialogue_id, otherUser) => {
    try {
      const newChat = collection(user, "chats")
      await addDoc(newChat, {
        dialogue_id: dialogue_id,
        otherUser: otherUser.username,
        lastMessage: ""
      })
    } catch (e) {
      setError(e.message)
      console.error("Error creating chat:", e)
    }
  }
  
  const initChat = async (otherUser_id) => {
    const otherUserData = await getUserData(otherUser_id)
    const currentUserData = await getUserData(currentUser.uid)
    const dialogue_id = await createDialogue(otherUser_id)
    await createChat(currentUserData.userRef, dialogue_id, otherUserData.userObj)
    await createChat(otherUserData.userRef, dialogue_id, otherUserData.userObj)
    setSelectedDialogue(dialogue_id)
    setStartNewChat(false)
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

  // useEffect(() => {
  //   const getChats = async () => {
  //     try {
  //       const currentUserData = await getUserData(currentUser.uid)
  //       const data = await getDocs(collection(currentUserData.userRef, "chats"))
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
  //   if (chats.length>0) {
  //     getDialogues()
  //   }
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
            />
          ) : (
            <UserList 
              currentUser={currentUser}
              initChat={initChat}
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
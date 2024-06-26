//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Firebase imports 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../.firebaseConfig'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'
import UserList from '../components/ChatComponents/UserList'


export default function ChatPage({currentUser, setCurrentUser}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [startNewChat, setStartNewChat] = useState(false)
  
  //Functions
  const navigate = useNavigate()

  const sendMessage = (message) => {
    console.log(message)
  }

  const createDialogue = (user) => {
    console.log(user)
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
              selectedDialogue={selectedDialogue}
              setSelectedDialogue={setSelectedDialogue}
            />
          ) : (
            <UserList 
              currentUser={currentUser}
              createDialogue={createDialogue}
            />
          )} 
        </div>
        <div className="basis-full flex flex-col justify-content: space-between">
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
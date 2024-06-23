//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'
import UserList from '../components/ChatComponents/UserList'


export default function ChatPage({user}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [startNewChat, setStartNewChat] = useState(true)
  
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
    if (!user) {
      navigate("/signin")
    }
  }, [user])
  

  //HTML
  return (
    <div className="flex flex-grow">
      <div className="flex flex-col basis-60">
        {!startNewChat ? (
          <ChatList 
            selectedDialogue={selectedDialogue}
            setSelectedDialogue={setSelectedDialogue}
          />
        ) : (
          <UserList 
            currentUser={user}
            createDialogue={createDialogue}
          />
        )} 
      </div>
      <div className="basis-full flex flex-col justify-content: space-between">
        <ChatHistory
          user={user}
        />
        <MessageInput 
          sendMessage={sendMessage}  
        />
      </div>
    </div> 
  )
}
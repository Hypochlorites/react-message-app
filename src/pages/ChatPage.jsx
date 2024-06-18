//React imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'
import ChatHistory from '../components/ChatComponents/ChatHistory'

export default function ChatPage({user}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  
  //Functions
  const navigate = useNavigate()

  const sendMessage = (message) => {
    console.log(message)
  }

  //Login forcer useEffect
  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
  }, [user])

  
  

  //HTML
  return (
    <div className="flex">

      <ChatList className=""
        selectedDialogue={selectedDialogue}
        setSelectedDialogue={setSelectedDialogue}
      />
      
      <div className="basis-full">

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
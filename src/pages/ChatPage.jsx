//React imports
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//Firebase imports
import { doc, setDoc} from 'firebase/firestore'
import { auth, db } from '../../.firebaseConfig'
//Component imports
import MessageInput from "../components/ChatComponents/MessageInput"
import ChatList from '../components/ChatComponents/ChatList'


export default function ChatPage({user}) {
  //State Variables
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  
  //Functions
  const navigate = useNavigate()

  const sendMessage = (message) => {
    console.log(message)
  }
  
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
        <MessageInput 
          sendMessage={sendMessage}  
        />
      </div>
    </div> 
  )
}
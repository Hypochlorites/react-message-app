//React imports
import { useState } from 'react'


export default function MessageInput({ sendMessage }) {
  //State Variables
  const [toSend, setToSend] = useState("")
  
  //Functions 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (toSend.length > 0) {
      sendMessage(toSend)
    }
    setToSend("")
  }


  //HTML
  return (
    <div className="bg-gray-200">
      <form onSubmit={handleSubmit} className="p-2 flex">
        <input 
          className="basis-full rounded-lg p-1 pl-2"
          type="text" 
          placeholder="mesage..."
          onChange={(e) => {setToSend(e.target.value)}} 
          value={toSend} >
        </input>
        <button type="submit" className={`rounded-lg border-2 border-black w-16 ml-2 ${toSend.length > 0 ? 'hover:bg-blue-200' : 'bg-gray-400'}`}>send</button>
      </form>
    </div>
  )
}


//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { collection, doc, getDoc, getDocs, query, where, or } from 'firebase/firestore'
//Component imports 
import ChatListItem from './ChatListItem'


export default function ChatList({currentUser, selectedDialogue, setSelectedDialogue, messages}) {
  //State Variables
  const [dialogues, setDialogues] = useState(null)
  const [error, setError] = useState(null)
  const [usernames, setUsernames] = useState({})

  //Functions
  const getOtherUsername = async (dialogue) => {
    try {
      const otherUser_id = (dialogue.user1 === currentUser.uid) ? dialogue.user2 : dialogue.user1
      const otherUserRef = doc(db, "users", otherUser_id)
      const otherUserSnap = await getDoc(otherUserRef)
      const otherUserObj = otherUserSnap.data()
      return otherUserObj.username
    } catch (e) {
      setError(`Error getting other username: ${e}`)
      console.error("Error in getOtherUsername:", e, e.message)
    }
  }

  const getDialogues = async () => {
    try {
      const dialoguesRef = collection(db, "dialogues")
      const q = query(dialoguesRef, or(where("user1", "==", currentUser.uid), where("user2", "==", currentUser.uid)))
      const dialogueSnaps = await getDocs(q)
      const dialogues = dialogueSnaps.docs.map(doc => ({ ...doc.data() }))
      return dialogues
    } catch (e) {
      setError(`Error getting dialogues: ${e}`)
      console.error("Error in getDialogues:", e, e.message)
    }
  }

  const getUsernames = async (dialogues) => {
    try {
      const usernamePromises = dialogues.map(async (dialogue) => {
        const username =  await getOtherUsername(dialogue)
        return {id: dialogue.id, username}
      })
      const usernameResponses = await Promise.all(usernamePromises)
      const usernames = usernameResponses.reduce((acc, {id, username}) => {
        acc[id] = username
        return acc
      }, {})        
      return usernames
    } catch (e) {
      setError(`Error getting usernames: ${e}`)
      console.error("Error in getUsernames:", e, e.message)
    }
  }
  
  //useEffects
  useEffect(() => {
    const loadData = async () => {
      const dialogues = await getDialogues()
      const usernames = await getUsernames(dialogues)
      setDialogues(dialogues)
      setUsernames(usernames)
    }
    loadData()
  }, [messages])

  
  //HTML 
  return (
    <div className="basis-full bg-gray-400">
      <div>
        { error ? (
          <p className="text-red-600 p-1">{error}</p>
        ) : (
          <div>
            { dialogues === null ? (
              <p className="p-1"> Loading... </p>
            ) : (
              <ul className="flex flex-col divide-y">
                {dialogues.map((dialogue, id) => (
                  <li key={id} onClick={() => {setSelectedDialogue(dialogue.id)}}> 
                    <ChatListItem 
                      username={usernames[dialogue.id]} 
                      lastMessage={dialogue.lastMessage}
                      selected={selectedDialogue === dialogue.id}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
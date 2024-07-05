//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { collection, doc, addDoc, getDoc, getDocs, setDoc, query, where, updateDoc, or, and } from 'firebase/firestore'
//Component imports 
import ChatListItem from './ChatListItem'


export default function ChatList({currentUser, selectedDialogue, setSelectedDialogue}) {
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
      setError(e.message)
      console.error("Error getting other username:", e)
    }
  }
  
  const getDialogues = async () => {
    try {
      const dialoguesRef = collection(db, "dialogues")
      const q = query(dialoguesRef, and(where("user1", "==", currentUser.uid), or(where("user2", "==", currentUser.uid))))
      const dialogueSnaps = await getDocs(dialoguesRef)
      const dialogues = dialogueSnaps.docs.map(doc => ({ ...doc.data() }))
      console.log(dialogues)
      setDialogues(dialogues)
    } catch (e) {
      setError(e.message)
      console.error("Error getting dialogues:", e)
    }
  }
  
  const getUsernames = async () => {
    try {
      const usernames = {}
      await Promise.all(dialogues.map(async (dialogue) => {
        usernames[dialogue.id] = getOtherUsername(dialogue)
      }))
      setUsernames(usernames)
    } catch (e) {
      setError(e.message)
      console.error("Error getting usernames:")
    }
  }
  
  //useEffects
  useEffect(() => {
    const loadData = async () => {
      await getDialogues()
      await getUsernames()
    }
    loadData()
  }, [])

  
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
                      lastMessage={dialogue.id}
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
//React imports
import { useState, useEffect } from 'react'
//Firebase imports
import { db } from '../../../.firebaseConfig'
import { getDocs, collection } from 'firebase/firestore' 


export default function UserList({currentUser, createDialogue})  {
  //State Variables
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  //useEffects  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userSnaps = await getDocs(collection(db, "users")) 
        const users = userSnaps.docs.map(doc => ({...doc.data()})).filter(user => user.id !== currentUser.uid)
        setUsers(users)
      } catch (e) {
        setError(e.message)
        console.error("Error getting UserList:", e)
      }
    }
    getUsers()
  }, [])

  
  //HTML
  return (
    <div className="basis-full bg-gray-400">
      { error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div>
          { users.length === 0 ? (
            <p className="p-1"> Loading... </p>
          ) : (
            <ul className="flex flex-col divide-y">
              {users.map((user, id) => (
                <li className="text-lg font-bold p-1" key={id} onClick={() => {createDialogue(user.id)}}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>  
      )}
    </div>
  )
}
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
        const data = await getDocs(collection(db, "users")) 
        const users = data.docs.map(doc => ({
          ...doc.data()
        })).filter(user => user.id !== currentUser.uid)
        setUsers(users)
      } catch (e) {
        setError(e.message)
        console.error("Error getting UserList: ", e)
      }
    }
    getUsers()
  }, [])

  
  //HTML
  return (
    <div>
      { error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="basis-full bg-gray-400">
          <ul className="flex flex-col divide-y">
            {users.map((user, id) => (
              <li className="text-lg font-bold" key={id} onClick={() => {createDialogue(user)}}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
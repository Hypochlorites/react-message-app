//React imports
import {useState, useEffect, useMemo, createContext, useContext} from 'react'
//Firebase imports
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../.firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  //StateVariables
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserObj, setCurrentUserObj] = useState(null)
  const [error, setError] = useState(null)

  //Functions
  const getUserObj = async (user_id) => {
    try {
      const userRef = doc(db, "users", user_id)
      const userSnap = await getDoc(userRef)
      const userObj = userSnap.data()
      setCurrentUserObj(userObj)
    } catch (e) {
      setError(`Error getting user object: ${e}`)
      console.error("Error in getUserObj:", e, e.message)
    }
  }

  //useEffects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        getUserObj(user.uid)
      } else {
        setCurrentUser(null)
        setCurrentUserObj(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({ currentUser, setCurrentUser, currentUserObj, error }), [currentUser, setCurrentUser, currentUserObj, error])
  
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => {
  return useContext(CurrentUserContext)
}
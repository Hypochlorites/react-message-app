//React imports
import {useState, useEffect, useMemo, createContext, useContext} from 'react'
//Firebase imports
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../.firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'


//Setup
const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  //StateVariables
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserObj, setCurrentUserObj] = useState(null)
  const [currentUserRef, setCurrentUserRef] = useState(null)
  const [contextError, setContextError] = useState(null)

  //Functions
  const getUserObj = async (user_id) => {
    try {
      const userRef = doc(db, "users", user_id)
      const userSnap = await getDoc(userRef)
      const userObj = userSnap.data()
      setCurrentUserObj(userObj)
      setCurrentUserRef(userRef)
    } catch (e) {
      setContextError(`Error getting user object: ${e}`)
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
        setCurrentUserRef(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({ currentUser, setCurrentUser, currentUserObj, setCurrentUserObj, currentUserRef, contextError }), [currentUser, setCurrentUser, currentUserObj, setCurrentUserObj, currentUserRef, contextError])
  
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => {
  return useContext(CurrentUserContext)
}
//React imports
import {useState, useEffect, useMemo, createContext, useContext} from 'react'
//Firebase imports
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../.firebaseConfig'

//Functions
const CurrentUserContext = createContext()

//Exported Functions
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser])
  
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => {
  return useContext(CurrentUserContext)
}
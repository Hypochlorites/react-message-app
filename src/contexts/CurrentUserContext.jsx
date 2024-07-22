//React imports
import {useState, useEffect, createContext, useContext} from 'react'
//Firebase imports
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../.firebaseConfig'


const CurrentUserContext = createContext()


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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}


export const useCurrentUser = () => {
  return useContext(CurrentUserContext)
}
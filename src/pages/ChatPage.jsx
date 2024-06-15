//React imports
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Firebase imports
import { doc, setDoc} from 'firebase/firestore';
import { auth, db } from '../../.firebaseConfig';


export default function ChatPage({user}) {

  //Functions
  const navigate = useNavigate()

  // const getUser = async (user) => {

  // }


  
  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
  }, [user])


  //HTML
  return (
    <h1 className="font-bold"> Chat </h1>
  )

}
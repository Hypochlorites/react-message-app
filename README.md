# Messaging App Project

## Overview 
Updated version of an old project that I used to learn react. This project aims to be more clean and functional, as the old project has a lot of inefficient and redundant code in it. Still just a project being used to learn react, but should be more functional. Connected to a firebase databse to manage the users, dialogues, messages, and authentication. Uses tailwind for styling. 

## Current State
Connected to a firebase database for authentication, and the storage of users, dialogues, and messages. Various state variables are alongside conditional rendering used to have the website affected by these database elements. Extensive use of react's useEffect hook for the ChatPage and ProfilePage, and occasional use of react's useMemo hook to optimize certain processes. Use of error handling for every single function. ChatPage allows the creation of dialogues and sending of messages to other users using a mix of react state variables and the firebase database. ProfilePage uses firebase's authentication functions to allow users to change their username, profile picture, password, and email. 

## Todo:
  * Improve display of messages.
    * profile bar
  * Update homepage
  * styling
  * Revamp userlist
  * groupchats

## Firebase Architecture 
  * ### users
    * email
    * id
    * username
  * ### dialogues
    * id
    * lastMessage
    * user1
    * user2
    * #### messages
      * from
      * message
      * timeStamp
## Firebase storage
  * ### Profile Pictures 

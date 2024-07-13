# Messaging App Project

## Overview 
Updated version of an old project that I used to learn react. This project aims to be more clean and functional, as the old project has a lot of garbage code in it. Still just a project being used to learn react, but should be more functional. Connected to a firebase databse to manage the users, dialogues, messages, and authentication. Uses tailwind for styling. 

## Current State
Connected to a firebase database for authentication, and the storage of users, dialogues, and messages. Various state variables are used to have the website affected by these database elements. Extensive use of react and firebase functions. Immense conditional rendering and error handling. Fully functional chat page. Working on optimizing how the chat page works and adding more to the homepage.

## Database Architecture 
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
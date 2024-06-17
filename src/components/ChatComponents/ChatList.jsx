//Component imports 
import ChatListItem from './ChatListItem'
//Temporary import
import Dialogues from '../../dialogues'


export default function ChatList({selectedDialogue, setSelectedDialogue}) {
  //HTML
  return (
    <ul className="flex flex-col divide-y">
      {Dialogues.map((dialogue, id) => (
        <li key={id} onClick={() => {setSelectedDialogue(id)}}> 
          <ChatListItem 
            username={dialogue['user']}
            LastMessage={dialogue['lastMessage']}
            selected={selectedDialogue === id}
          />
        </li>
      ))}
    </ul>
  )
}
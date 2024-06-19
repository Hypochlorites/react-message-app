//Component imports 
import ChatListItem from './ChatListItem'
//Temporary imports
import Dialogues from '../../dialogues'


export default function ChatList({selectedDialogue, setSelectedDialogue}) {
  //HTML
  return (
    <div className="basis-full bg-gray-400">
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
    </div>
  )
}
//Component imports 
import ChatListItem from './ChatListItem'


export default function ChatList({selectedDialogue, setSelectedDialogue}) {
  //HTML 
  return (
    <div className="basis-full bg-gray-400">
      <div>
        { chats === null ? (
          <p> Loading... </p>
        ) : (
          <ul className="flex flex-col divide-y">
            {chats.map((chat, id) => (
              <li key={id} onClick={() => {setSelectedDialogue(chat.dialogue_id)}}> 
                <ChatListItem 
                  username={chat.otherUser}
                  LastMessage={chat.lastMessage}
                  selected={selectedDialogue === chat.dialogue_id}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
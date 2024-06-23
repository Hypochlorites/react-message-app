//Component imports 
import Message from './Message'
//Temporary imports
import Messages from '../../messages'


export default function ChatHistory(user) {
  //HTML
  return (
    <div className="basis-full bg-gray-100">
      <ul>
        {Messages.map((message, id) => (
          <li key={id}>
            <Message 
              message={message}
              isIncoming={message.from !== user.user.uid}
            />
          </li>
        ))}
      </ul> 
    </div>
  )
}
import Messages from '../../messages'
//Component imports 
import Message from './Message'


export default function ChatHistory(user) {
  //HTML
  return (
    <ul className="basis-full bg-gray-100">
      {Messages.map((message, id) => (
        <li key={id}>
          <Message 
            message={message}
            isIncoming={message.from !== user.user.uid}
          />
        </li>
      ))}
    </ul> 
  )
}
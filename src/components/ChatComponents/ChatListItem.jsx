export default function ChatListItem({ username, LastMessage, selected }) {
  return (
    <div className={`p-1 ${selected? 'bg-gray-200' : 'bg-gray-400'}`}>
        <h1 className="text-lg font-bold "> {username} </h1>
        <p> {LastMessage} </p>
    </div>
  )
}
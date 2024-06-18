export default function Message({message, isIncoming}) {
  return (
    <div className={`flex flex-col rounded-lg w-fit ${isIncoming? `bg-blue-200 items-end` : `bg-green-300 items-start`}`}>
      <p>{message.message}</p>
      <p>{message.timestamp}</p>
    </div>
  )
}
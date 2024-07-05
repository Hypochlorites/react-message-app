export default function Message({message, isIncoming, timeStamp}) {
  return (
    <div className={`flex flex-col rounded-lg w-fit mt-4 p-2 ${isIncoming? `bg-green-300 items-start ml-auto mr-2` : `bg-blue-200 items-end ml-2`}`}>
      <p>{message.message}</p>
      <p className="text-xs">{message.timestamp}</p>
    </div>
  )
}
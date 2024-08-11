export default function Message({message, isIncoming, timestamp, otherUser, user}) {
  return (
    <div className={`flex flex-col rounded-lg w-fit mt-4 p-2 ${!isIncoming? `bg-green-300 items-end ml-auto mr-2` : `bg-blue-200 items-start ml-2`}`}>
      <div className="flex items-center">
        {isIncoming ? (<p className="mr-2 font-semibold text-lg">{otherUser}</p>) : (<p className="mr-2 font-semibold text-lg">{user}</p>) }
        <p className="text-xs">{timestamp}</p>
      </div>
      <p>{message}</p>
    </div>
  )
}
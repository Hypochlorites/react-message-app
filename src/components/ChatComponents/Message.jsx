export default function Message({message, isIncoming, timestamp}) {
  return (
    <div className={`flex flex-col rounded-lg w-fit mt-4 p-2 ${!isIncoming? `bg-green-300 items-end ml-auto mr-2` : `bg-blue-200 items-start ml-2`}`}>
      <p className="text-xs">{timestamp}</p>
      <p>{message}</p>
    </div>
  )
}
export default function Message({message, isIncoming, timestamp, otherUserPhoto, otherUsername, user, userPhoto}) {
  return (
    <div className={`rounded-lg w-fit mt-4 p-2 ${!isIncoming? `bg-green-300 items-end ml-auto mr-2` : `bg-blue-200 items-start ml-2`}`}>
      <div className="flex">
          <img className="rounded-full mr-2" src={isIncoming? otherUserPhoto : userPhoto } width="50px" height="50px"></img>
        <div className="flex flex-col">
          <div className="flex items-center">
            {isIncoming ? (<p className="mr-2 font-semibold text-lg">{otherUsername}</p>) : (<p className="mr-2 font-semibold text-lg">{user}</p>) }
            <p className="text-xs">{timestamp}</p>
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
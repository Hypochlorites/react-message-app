export default function ProfileBar({ setShowProfileBar, position, photoURL, username, bio, sendFriendRequest }) {  
  return (
    <div className="fixed inset-0 bg-black z-50 max-w-xl max-h-96 ml-48
        flex flex-col text-white items-center rounded-xl"
        style={{
          top: position.top,
          right: position.right
        }}>
      <div className="flex mt-2 items-center w-4/6 justify-between mb-4">
        <img className="rounded-full" src={photoURL} width="175px" height="175px"></img>
        <h1 className="font-bold text-4xl"> {username} </h1>
      </div>
      <textarea
        className="resize-none text-2xl bg-gray-400 rounded-lg text-center mb-4 min-h-10 w-11/12"
        id="bio"
        wrap="soft"
        readOnly
        value={bio}>
      </textarea>
      <div className="flex w-full justify-evenly mb-2">
        <button className="bg-gray-500 border-2 rounded-lg p-1 border-white hover:bg-green-200" onClick={sendFriendRequest}> Send Friend Request </button>
        <button className="text-4xl bg-gray-500 border-2 rounded-lg border-white w-16 hover:bg-red-400" onClick={() => setShowProfileBar(false)}>X</button>
      </div>
    </div>
  )
}
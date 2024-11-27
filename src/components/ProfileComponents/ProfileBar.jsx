export default function ProfileBar({ setShowProfileBar, position, photoURL, username, bio }) {  
  return (
    <div className="fixed inset-0 bg-black z-50 max-w-xl max-h-96 ml-48
        flex flex-col text-white items-center rounded-xl"
        style={{
          top: position.top,
          right: position.right
        }}>
      <div className="flex mt-2 items-center w-4/6 justify-between">
        <img className="rounded-full" src={photoURL} width="200px" height="200px"></img>
        <h1 className="font-bold text-4xl"> {username} </h1>
      </div>
      <textarea
        className="resize-none text-2xl bg-gray-400 rounded-lg text-center mt-4 mb-4 min-h-60 w-11/12"
        id="bio"
        wrap="soft"
        readOnly
        value={bio}>
      </textarea>
      <button className="text-4xl bg-gray-500 border-2 rounded-lg border-white ml-2 mr-2 mb-2 w-16 hover:bg-red-400" onClick={() => setShowProfileBar(false)}>X</button>
    </div>
  )
}
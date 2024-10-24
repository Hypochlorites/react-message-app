export default function ProfileBar({ setShowProfileBar, position, photoURL, username, bio }) {  
  return (
    <div className="fixed inset-0 bg-black z-50
        flex flex-col text-white items-center rounded-xl"
        style={{
          top: position.top,
          right: position.right
        }}>
      <div className="flex mt-2 items-center w-4/6 justify-between">
        <img src={photoURL} width="200px" height="200px"></img>
        <h1 className="font-bold text-4xl"> {username} </h1>
      </div>
      <p className="text-2xl bg-gray-400 w-10/12 rounded-lg text-center mt-4 mb-4"> {bio} </p>
      <p onClick={() => setShowProfileBar(false)}>X</p>
    </div>
  )
}
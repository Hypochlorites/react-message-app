

export default function HomePage({signedIn, setSignedIn}) {
  if (signedIn) {
    return (
      <h1 className="font-bold"> Home </h1>
      )
  } else {
    return (
      <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-neutral-300 to-stone-400">
        <h1 className="font-bold text-4xl"> Create an account to chat with millions of users! </h1>
        <a href="signup"> Sign Up</a>
        <a href="signin"> Login</a>
      </div>
    )
  }
  
    
  
  
}
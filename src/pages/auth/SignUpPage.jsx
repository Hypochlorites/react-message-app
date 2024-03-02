import { Link } from 'react-router-dom';


export default function SignUpPage() {
    
  const handleSubmit = (e) => {
    e.preventDefault()
  }
    
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold underline"> Create an Account </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center"> 
        <div className="p-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input 
            className="p-2 border-2 border-black rounded-md"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            /* onChange={(e) => { setEmail(e.target.value) }} */>
          </input>
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border-2 border-black rounded-md"
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            /* onChange={(e) => { setPassword(e.target.value) }} */> 
          </input>
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border-2 border-black rounded-md"
            id="username"
            type="text"
            name="username"
            required
            /* onChange={(e) => { setUsername(e.target.value) }}*/>
          </input>
        </div>
        <button type="submit" className="border-2 p-2 border-black rounded-md hover:bg-blue-200">Sign Up</button>
      </form>
      <h1> Already have an account? <Link className="text-blue-600" to="/signin"> Login! </Link></h1>
    </div>
  )
}
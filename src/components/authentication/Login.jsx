import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useUser} from './context'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const {setUser} = useUser()

  const navigate = useNavigate()

  const onRegistrationNavigate = ()=>{
    navigate("/register")
  }

  const onLoginResponse = (data)=>{
    setUser(data.data)
  }

  const onSignInSubmit = async(e)=>{
    e.preventDefault()
    const url = "http://localhost:5000/api/signIn"
    try{
      setLoading(true)
      const response = await axios.post(url, {
        email,
        password
      })
      setEmail("")
      setPassword("")
      onLoginResponse(response)
      setLoading(false)
      navigate('/')
      return response.data

    }catch(error){
      return error?.message
    }

  }
  return (
    <main className='flex flex-col w-screen items-center bg-slate-200 h-screen pt-5'>
      <h1 className='text-center text-3xl font-medium py-5'>
      Sign in to your Account
      </h1>
      <form className='flex flex-col pt-10 gap-5 justify-center' onSubmit={(e)=>onSignInSubmit(e)}>
        <div className='flex gap-10'>
          <label htmlFor='email' className='w-1/4'>
            Email
          </label>
          <input type='text' value={email} placeholder='email'
          required
          className='border border-slate-300 px-2 rounded-sm outline-none bg-slate-200'
          onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className='flex gap-10'>
          <label htmlFor='email' className='w-1/4'>
            Password
          </label>
          <input type='password' value={password} placeholder='password'
          required
           className='border border-slate-300 px-2 rounded-sm outline-none bg-slate-200'
           onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <button className='bg-black rounded-md text-white px-2'
          type='submit'
          >{loading ? ("Signing in"):("Sign in")}</button>
        </div>
      </form>
      <div className='flex gap-2 pt-3'>
        <p>Dont have an sccount ?</p>
        <button className='cursor-pointer text-black font-bold'
        onClick={onRegistrationNavigate}
        >Register here</button>
      </div>
    </main>
  )
}

export default Login
 

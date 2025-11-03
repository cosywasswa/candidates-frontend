import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useUser} from './context'

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useUser()

  const onLoginNavigate = ()=>{
    navigate("/login")
  }

  const onRegisterResponse = (data)=>{
    if(data){
      setUser(data)
    }

  }

  const onRegistrationSubmit = async(e)=>{
    e.preventDefault()
    const url = "http://localhost:5000/api/users"
    try{
      setLoading(true)
        const response = await axios.post(url, {
        fullName,
        email,
        password
    })
    if(response){
        setFullName("")
        setEmail("")
        setPassword("")
        setLoading(false)
    }
    onRegisterResponse(response)
    onLoginNavigate()
    return response.data
    }catch(error){
        return error?.message
    }

  }
  return (
    <main className="flex flex-col w-screen items-center bg-slate-200 h-screen pt-5">
      <h1 className="text-center text-3xl font-medium py-5">
        Register An Account
      </h1>
      <form className="flex flex-col pt-10 gap-5 justify-center"
      onSubmit={(e)=>onRegistrationSubmit(e)}
      >
        <div className="flex gap-10">
          <label htmlFor="name" className="w-1/4">
            Full name
          </label>
          <input
            type="text"
            value={fullName}
            placeholder="eg. John Doe"
            required
            className="border border-slate-300 px-2 rounded-sm outline-none bg-slate-200"
            onChange={(e)=>setFullName(e.target.value)}
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="email" className="w-1/4">
            Email
          </label>
          <input
            type="text"
            value={email}
            placeholder="email"
            required
            className="border border-slate-300 px-2 rounded-sm outline-none bg-slate-200 w-3/4"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="email" className="w-1/4">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="password"
            required
            className="border border-slate-300 px-2 rounded-sm outline-none bg-slate-200 W-3/4"
            onChange={(e=>setPassword(e.target.value))}
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-black rounded-md text-white px-2" type="submit">
            {
              loading ? ("Registering"):("Register")
            }
          </button>
        </div>
      </form>
      <div className="flex gap-2 pt-3">
        <p>Have an account ?</p>
        <button className="cursor-pointer  text-black font-bold"
        onClick={onLoginNavigate}
        >Sign in here</button>
      </div>
    </main>
  );
};

export default Register;

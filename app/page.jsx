"use client"
import React from 'react'
import axios from "axios"
import { useState,useRef,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast"

const Login = () => {
    const [loginstate, setloginstate] = useState("Signup")
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const router=useRouter()
    
    const submithandler=async(e)=>{
        try{
            e.preventDefault()
            axios.defaults.withCredentials=true
            if(loginstate==="Signup"){
                const {data}=await axios.post("/api/register",{username:username.current.value,email:email.current.value,password:password.current.value})
                if (data.success){
                setloginstate("Login")               
                toast.success('User registered successfully!')
                username.current.value=""
                email.current.value=""
                password.current.value=""
            }
                else{
                    toast.error(data.message)
                    console.log(data.message)
                }
            }
            else if(loginstate==="Login"){
                const {data}=await axios.post("/api/login",{email:email.current.value,password:password.current.value})
                console.log(data)
                if(data.success){
                    toast.success("Logging you in")
                    router.push("/dashboard")
                }
                else {
                    toast.error(data.message)
                }
            }
        }catch(error){
            console.log(error.message)
        }
    }



    useEffect(() => {       
        email.current.value=""
        password.current.value=""    
    }, [loginstate])


    useEffect(()=>{
        const checkLoggedIn=async()=>{
            axios.defaults.withCredentials=true
            const {data}=await axios.get("/api/checkAuth")
            if(data.loggedIn) router.push("/dashboard")
        }
        checkLoggedIn()
    },[])
    

  return (
    <div className=' h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-500 '>
        <div className='drop-shadow-2xl md:py-6 shadow-2xl border-1 md:h-fit w-full md:w-2/5 flex flex-col items-center bg-slate-800 gap-3 rounded-xl'>
            <div className='text-3xl font-bold'>SignUp or Register !</div>
        <p className='text-blue-700 font-semibold'>{loginstate==="Signup"?"Create":"Login to"} your account</p>
            <form onSubmit={submithandler} className='flex flex-col w-9/10 gap-3'>
                {loginstate==="Signup" && <input ref={username} required className="w-full bg-slate-500 rounded-full px-2" type="text" placeholder='Enter your username' name='username'/>}
                <input ref={email} required className="w-full bg-slate-500 rounded-full px-2" type="email" placeholder='Enter email ID' name='email '/>
                <input ref={password} required className="w-full bg-slate-500 rounded-full px-2" type="password" placeholder='Enter password' name='password'/>
                <input type="submit" value={loginstate==="Login"?"Login":"Signup"} className='w-1/3 rounded-full py-2 font-bold bg-blue-800 hover:bg-blue-500 cursor-pointer transition transition-400'/>
            </form>
            
            {loginstate==="Signup" && <p className="font-semibold text-white">Already have an account? <span onClick={()=>setloginstate("Login")} className='underline text-blue-500 cursor-pointer'>LogIn</span></p>}
            {loginstate==="Login" && <p className="font-semibold text-white">Dont have an account? <span onClick={()=>setloginstate("Signup")} className='underline text-blue-500 cursor-pointer'>SignUp</span></p>}
        </div>
    </div>
  )
}

export default Login

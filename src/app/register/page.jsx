"use client"

import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const RegisterPage = () => {

    const  [name, setName] = useState("");
    const  [email, setEmail] = useState("");
    const  [password, setPassword] = useState("");
    const  [Confirmpassword, setConfirmpassword] = useState("");
    const  [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {data: session} = useSession();
    if (session)
    {
        redirect('/home')
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (password != Confirmpassword)
        {
            setError("Wrong password");
            return ;
        }

        if (!name || !email || !password || !Confirmpassword)
        {
            setError("Complete all your inputs");
            return ;
        }

        try{
            const resUserExists = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userExists`, {
                method : "POST" ,
                headers:{ "Content-Type" : "application/json"},
                body: JSON.stringify({email})
            })

            const {user} = await resUserExists.json()

            if (user){
                setError("User already exists");
                return ;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
                method : "POST" ,
                headers:{ "Content-Type" : "application/json"},
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok)
            {
                const form = e.target;
                setError("");
                setSuccess("Registered successfully");
                form.reset();
            }
            else{
                console.log("Register failed")
            }

        }catch(error){
            console.log("Error", error);
        }
    }

  return (
    <Container>
        <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-2xl'>Register</h3>
                        <hr className='my-3 text-gray-200'/>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className='bg-red-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md'>
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className='bg-green-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md'>
                                    {success}
                                </div>
                            )}
                            <input type="text" onChange={(e) => setName(e.target.value)} className='w-full bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='Enter your name'/>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className='w-full bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='Enter your email'/>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className='w-full bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='Enter your password'/>
                            <input type="password" onChange={(e) => setConfirmpassword(e.target.value)} className='w-full bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='Confirm your password'/>
                            <button type='submit' className='bg-green-500 hover:bg-green-700 text-white border py-2 px-3 my-2 rounded text-lg'>Sign Up</button>
                        <hr className='my-3 text-gray-200'/>
                        <p><Link className='text-blue-700 hover:underline' href='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
    </Container>
  )
}

export default RegisterPage
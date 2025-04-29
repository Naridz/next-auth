"use client"

import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();
    const {data:session} = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
        if (res.error) {
            setError("Invalid password")
            return ;
        }
        router.replace("home")
        }catch (error){
            console.log(error)
        }
    }

  return (
    <Container>
        <Navbar session={session} />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-2xl'>Login</h3>
                        <hr className='my-3 text-gray-200'/>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className='bg-red-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md'>
                                    {error}
                                </div>
                            )}
                            <input type="text" onChange={(e) => setEmail(e.target.value)} className='w-full bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='Enter your email'/>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className='w-full bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='Enter your password'/>
                            {!session ? (
                                <>
                                <button type='submit' className='bg-green-500 hover:bg-green-700 text-white border py-2 px-3 my-2 rounded text-lg'>Sign In</button>
                                </>
                            ):(
                                <>
                                <button disabled className='disabled:bg-gray-500 bg-green-500 hover:bg-green-700 text-white border py-2 px-3 my-2 rounded text-lg'>Sign In</button>
                                </>
                            )}
                        <hr className='my-3 text-gray-200'/>
                        <p><Link className='text-blue-700 hover:underline' href='/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
    </Container>
  )
}

export default LoginPage
"use client"

import React , {useState, useEffect} from 'react'
import Navbar from '../../../components/Navbar'
import Container from '../../../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect , useParams, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

const EditPage = () => {

  const {data: session} = useSession();
  const router = useRouter()
  if (!session)
    {
        redirect('/login')
    }
    
    const {id} = useParams()
    
    const [userOldData, setUserOldData] = useState([])
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    
    const getAllUserById = async (id) => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
                method: "GET",
                cache: "no-store"
            })
            
            if (!res.ok){
                throw new Error("Failed. . .")
            }
            const data = await res.json()
            setUserOldData(data.user)
        }catch (error){
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUserById(id)
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({newName, newEmail, newPassword})
            })
            
            if (!res.ok){
                throw new Error("Failed to Update")
            }
            router.refresh()
            router.push("/home")
            if (session.user.email == userOldData.email){
                signOut();
            }
        }catch (error){
            console.log(error)
        }
    }
    return (
        <Container>
        <Navbar session={session} />
            <div className=' flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-8 rounded-xl'>
                    <Link href='/home' className='bg-gray-500 hover:bg-gray-700 inline-block text-white border py-2 px-3 rounded-lg my-2'>Back</Link>
                    <hr className='my-3'/>
                    <h3 className='text-xl'>Edit name</h3>
                    <form onSubmit={handleSubmit}>
                        <input type='text' onChange={(e) => setNewName(e.target.value)} className='w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2' value={newName} placeholder={userOldData?.name}/>
                        <input type='email' onChange={(e) => setNewEmail(e.target.value)} className='w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2' value={newEmail} placeholder={userOldData?.email}/>
                        <input type='password' onChange={(e) => setNewPassword(e.target.value)} className='w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2' value={newPassword} placeholder='password'/>
                        <button type='submit' className='bg-green-600 hover:bg-green-900 text-white border py-2 px-5 my-2 rounded-md text-lg'>OK</button>
                    </form>
                </div>
            </div>
    </Container>
  )
}

export default EditPage
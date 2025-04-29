"use client"

import React , {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { DeleteBtn } from './DeleteBtn'

const HomePage = () => {

const {data: session} = useSession();
const [allUserData, setAllUserData] = useState([]);

if (!session)
    {
        redirect('/login')
    }

const getAllUserData = async () => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
            cache: "no-store"
        })

        if (!res.ok){
            throw new Error("Failed to fecth user")
        }

        const data = await res.json();
        setAllUserData(data.totalUsers)

    }catch (error){
        console.log(error)
    }
}

    useEffect(() => {
        getAllUserData()
    }, [])
    
  return (
    <Container>
        <Navbar session={session} />
        <div className='flex-grow'>
            {allUserData.map((val) => (
        <React.Fragment key={val._id}>
            {session.user.email === val.email ? (<>
            <div className='container bg-green-200 mx-auto shadow-xl my-10 p-8 rounded-xl'>
                <div className='flex justify-between'>
                    <div className='mt-2'>
                        <h3 className='text-3xl mb-1'>{val.name}</h3>
                        <p>{val.email}</p>
                    </div>
                    <div className='flex'>
                        <Link className='bg-gray-500 hover:bg-gray-700 text-white border mt-5 my-2 py-2 px-3 rounded-md' href={`/home/edit/${val._id}`}>Edit</Link>            
                        <DeleteBtn session={session.user.email} allUserData={val.email} id={val._id} />
                    </div>
                </div>
            </div>
            </>):(<>
            <div className='container mx-auto shadow-xl my-10 p-8 rounded-xl'>
                <div className='flex justify-between'>
                    <div className='mt-2'>
                        <h3 className='text-3xl mb-1'>{val.name}</h3>
                        <p>{val.email}</p>
                    </div>
                    <div className='flex'>
                        <Link className='bg-gray-500 hover:bg-gray-700 text-white border mt-5 my-2 py-2 px-3 rounded-md' href={`/home/edit/${val._id}`}>Edit</Link>            
                        <DeleteBtn session={session.user.email} allUserData={val.email} id={val._id} />
                    </div>
                </div>
            </div>
            </>)}
            </React.Fragment>
        ))}
        </div>
    </Container>
  )
}

export default HomePage
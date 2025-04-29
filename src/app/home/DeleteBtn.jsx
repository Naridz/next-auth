"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export const DeleteBtn = ({id, session, allUserData}) => {

    const router = useRouter()
    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");

        if (confirmed){
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers?id=${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                router.push("/")
            }
        }
    }
  return (
    <>
        {(session == allUserData) ? (
            <button disabled className='disabled:cursor-not-allowed bg-red-500 text-white border mt-5 my-2 py-2 px-3 rounded-md' onClick={handleDelete}>
                Delete
            </button>   
    ):(
            <a className='bg-red-500 hover:bg-red-700 text-white border mt-5 my-2 py-2 px-3 rounded-md' onClick={handleDelete}>
                Delete
            </a>
    )}
    </>
  )
}

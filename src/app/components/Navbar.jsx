"use client"

import React from 'react'
import Link from 'next/link'
import Logo from '../../../public/next.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const Navbar = ({session}) => {
  return (
	<nav className='shadow-xl bg-red-50'>
		<div className='container mx-auto'>
			<div className='flex justify-between items-center p-8'>
				<div>
					<Link href="/">
						<Image src={Logo} width={120} height={120} alt='Logo' />
					</Link>
				</div>
				<ul className='flex'>
					{!session ?(
					<>
						<li className='mx-3 hover:underline'><Link href="/login">Login</Link></li>
						<li className='mx-3 hover:underline'><Link href="/register">Register</Link></li>
					</>
					):
					(
					<li className='mx-3'>
						<Link href="/home" className='bg-gray-500 hover:bg-gray-700 text-white border py-2 px-3 my-2 rounded-lg text-lg'>Home</Link>
						<a onClick={() => signOut()} className='bg-red-500 hover:bg-red-700 text-white border py-2 px-3 my-2 rounded-lg text-lg'>Logout</a>
					</li>
					)}
				</ul>
			</div>
		</div>
	</nav>
  )
}

export default Navbar
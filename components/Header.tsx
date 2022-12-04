import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {SearchIcon, ShoppingBagIcon, UserIcon} from "@heroicons/react/outline";
import { selectBasketItems } from '../redux/basketSlice';
import {useSelector} from "react-redux"
import { signIn, signOut, useSession } from "next-auth/react";


function Header() {
  const { data: session} = useSession();
  const items =  useSelector(selectBasketItems)


  return (
    <header className='w-full p-4 flex justify-between items-center z-30 sticky top-0 bg-[#e7ecee]'>
      <div className='items-center justify-center flex md:w-1/5'>
        <Link href='/'>
          <div className='cursor-pointer h-10 w-5 relative opacity-75 hover:opacity-100 transition '>
              <Image src="https://rb.gy/vsvv2o" objectFit="contain" layout='fill' alt='/' />
          </div>
        </Link>
      </div>
      <div className='justify-center items-center space-x-8 hidden flex-1 md:flex'>
        <a className="headerLink link">Product</a>
        <a className="headerLink link">Explore</a>
        <a className="headerLink link">Support</a>
        <a className="headerLink link">Business</a>
      </div>
      <div className='items-center justify-center md:w-1/5 flex gap-x-4'>
        <SearchIcon className='headerIcon' />
        <Link href='/checkout' >
          <div className='cursor-pointer relative'>
            {items.length > 0 && ( 
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">{items.length}</span>
            )}
            <ShoppingBagIcon className='headerIcon' />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" 
          onClick={() => signIn()} 
          />
        )}      
      </div>
    </header>
  )
}

export default Header

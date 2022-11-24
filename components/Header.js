import React from 'react'
import Image from 'next/image'
import instagram from '../assests/instagram.png'
import { IoIosArrowDown } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';
import { BiHomeCircle } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { FaDraftingCompass } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import {modalState} from '../atoms/modalState'
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
    const [open,setOpen]= useRecoilState(modalState)
  console.log(open)
  console.log(session)

  return (
    <div className='flex items-center justify-between
    border-b shadow-sm lg:mx-[3rem] lg:mt-2 sticky
    top-0 bg-gradient-to-r from-gray-300 z-10 rounded'>
      {/* Left */}
      <div className='flex gap-1 pt-4 items-center'>
        <div className='w-[8rem] '>
            <Image src={instagram}/>
        </div>
        <div className='h-3 w-3'>
            <IoIosArrowDown/>
        </div>
      </div>

      {/* Middle */}
      <div className='hidden sm:flex items-center 
      relative lg:w-[45rem]'>
        <BiSearchAlt className='absolute flex 
        items-center ml-3 mt-1'/>
        <input type="Search" placeholder="Search"
        className='pl-9 w-full rounded-[1.5rem] p-1.5 
        mt-1 bg-[#e7e7e7]'/>
      </div>

      {/* Right */}
      <div className='flex gap-3 items-center lg:gap-6'>
        <div className='flex gap-3 text-[1.3rem] lg:gap-5'>
        <BiHomeCircle className=' hidden sm:flex cursor-pointer'/>
        <FiSend className='hidden sm:flex cursor-pointer'/>

        <BiMessageSquareAdd className='cursor-pointer'
         onClick={()=> setOpen(!open)}/>

        <FcLikePlaceholder className='hidden sm:flex cursor-pointer'/>
        <FaDraftingCompass className='hidden sm:flex cursor-pointer'/>
        </div>
        <div className='' onClick={signIn}>
          {/* if session or user not defined (?)*/}
            <img src={session?.user?.image}
             className='w-[2rem] rounded-full'/>
        </div>
        <button className=' font-medium text-[#b368ff]'
        onClick={signIn}>
            Sign out</button>
      </div>
    </div>
  )
}
export default Header
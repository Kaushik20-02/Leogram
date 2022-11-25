import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoIosArrowDown } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';
import { BiHomeCircle } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { MdOutlineLightMode } from 'react-icons/md';
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

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }, [])
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className='flex items-center justify-between gap-4
    border-b shadow-sm sm:-mx-[2rem] lg:mx-[3rem] lg: sticky
    top-0 bg-gradient-to-r from-gray-200 z-10 rounded-[1.2rem]'>
      {/* Left */}
      <div className='flex gap-1 pt-4 items-center'>
        <div className='pl-3 pb-1'>
          <p className='font-bold text-[2rem]'>
            Leo<span className='text-purple-500'>gram</span></p>
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
      <div className='flex gap-2 pt-3 items-center lg:gap-6'>
        <div className='flex gap-3 text-[1.3rem] lg:gap-5'>
        <BiHomeCircle className=' hidden dark:text-slate-200 sm:flex cursor-pointer'/>
        <FiSend className='hidden dark:text-slate-200 sm:flex cursor-pointer'/>
        <div className='dark:text-slate-200' onClick={handleThemeSwitch}>
          <MdOutlineLightMode className='cursor-pointer'/></div>

        <BiMessageSquareAdd className='cursor-pointer dark:text-slate-200'
         onClick={()=> setOpen(!open)}/>

        <FcLikePlaceholder className='hidden sm:flex cursor-pointer'/>
        <FaDraftingCompass className='hidden sm:flex cursor-pointer dark:text-slate-200'/>
        </div>
        <div className='' onClick={signIn}>
          {/* if session or user not defined (?)*/}
            <img src={session?.user?.image} alt="" 
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
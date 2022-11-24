import React from 'react'
import user from '../assests/user.png'
import { useSession, signIn, signOut } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();
  
  return (
    <div className='flex justify-between mt-8 items-center'>
    <div className='flex items-center'>

      <div className=''>
        <img src={session?.user?.image} 
        className='w-10 h-10 rounded-full'/>
      </div>

      <p className='pl-3 text-sm font-semibold'>
        {session?.user?.name}</p>
    
    </div>
    
    <button className='text-xs font-semibold rounded-full
     text-[#b368ff] w-[4rem] h-8 bg-slate-200'>Sign in</button>
    </div>
  )
}

export default MiniProfile

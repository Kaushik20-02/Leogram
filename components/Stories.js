import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Story from '../components/Story'
import { useSession, signIn, signOut } from "next-auth/react";
import {BsPatchPlusFill} from 'react-icons/bs'

const Stories = () => {
  const { data: session } = useSession();

   {/*   Array of stories:-- */}
   const[stories,setStories]= useState([])
   useEffect(()=>{
    setStories(
      [...Array(30)].map((profile)=>({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
      );
    }, []); {/* [] Empty for never ending loop */}
    console.log(stories)
  return (
    <div>
      <div className=' flex gap-4 bg-gray-200 p-5
      overflow-x-scroll rounded-xl scrollbar-thin
       scrollbar-thumb-gray-300'>

        <div className='relative z-3'>
            <div className="flex flex-col rounded-full mt-1 w-14 h-14
            items-center">
              <img
                src={session?.user?.image}
                className="rounded-full object-cover
                p-[1px] border-[4px] border-[#b368ff]"/>
            </div>
            <div className='absolute -mt-5 pl-8 z-10'>
            <BsPatchPlusFill className='text-[#b7495d] w-6 h-5'/>
            </div>
            <p className='pl-1 text-xs '>
        {session?.user?.name}</p>
        </div>

          {/* Story for each profile */}
          {stories.map((profile)=>(
            <Story key= {profile.userId}
              username= {profile.username}
              avatar= {profile.avatar} />
          ))}
      </div>
    </div>
  )
}

export default Stories

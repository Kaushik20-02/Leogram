import React from 'react'

const Story = ({username,avatar}) => {

  return (
    <div>
      <img src={avatar} className='rounded-full 
      p-[1.5px] border-[4px] border-[#b368ff]'/>
      <p className=' text-xs w-[60px] truncate text-center'>{username}</p>
    </div>
  )
}

export default Story

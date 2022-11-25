import React from 'react'
import Stories from '../components/Stories'
import Posts from '../components/Posts'
import MiniProfile from '../components/MiniProfile'
import Suggestions from '../components/Suggestions'

const Feed = () => {
  return (
    <div className='flex max-w-[890px]  mt-4 mx-auto lg:max-w-[954px]'>
     <section className='max-w-[320px] w-full mx-8 hidden lg:block'>
        {/* MiniProfile*/}
            <MiniProfile/>
        {/* Suggestions*/}
            <Suggestions/>
      </section>
      <section className='max-w-[670px] mx-auto -ml-6 w-[100vw]'>
        {/* Stories*/}
            <Stories/>
        {/* Posts*/}
            <Posts/>
      </section>
      
    </div>
  )
}

export default Feed

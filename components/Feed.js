import React from 'react'
import Stories from '../components/Stories'
import Posts from '../components/Posts'
import MiniProfile from '../components/MiniProfile'
import Suggestions from '../components/Suggestions'
import { useState, useEffect } from "react";

const Feed = () => {
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
    
    <div className='flex max-w-[890px]  mt-4 mx-auto lg:max-w-[954px]'>
     <section className='max-w-[320px] w-full mx-8 hidden lg:block'>
        {/* MiniProfile*/}
            <MiniProfile/>
        {/* Suggestions*/}
            <Suggestions/>
      </section>
      <section className='max-w-[470px] sm:max-w-[670px]
       mx-auto -ml-7 sm:ml-3 w-[100vw]'>
        {/* Stories*/}
            <Stories/>
        {/* Posts*/}
            <Posts/>
      </section>
      </div>
  )
}

export default Feed

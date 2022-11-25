import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalState'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import media from '../assests/media.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import React, {useRef} from 'react'
import {addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,} from 'firebase/firestore'
import {db,storage} from '../firebase'
import { getDownloadURL,ref, uploadString } from 'firebase/storage'


export default function MyModal() {
  //Create data post and add it to the collection
  const uploadPost = async () => {
    setLoading(true); //time of uploading
    const docRef = await addDoc(collection(db, "posts"), {
      profileImg: session?.user?.image,
      username: session?.user?.name,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
 //Path for the image
 const imagePath = ref(storage, `posts/${docRef.id}/image`);

 //Upload image to that adress
 //Then with the snapshot declare the download URL
 await uploadString(imagePath, image, "data_url").then(async (snapshot) => {
   const downloadURL = await getDownloadURL(imagePath);
   await updateDoc(doc(db, "posts", docRef.id), {
     image: downloadURL,
   });
 });
    captionRef.current.value= null //text ll desapir
    setLoading(false) //initially loading false
    setImage('') // after upload post img remove
}; 

  {/* To post photos */}
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  {/* To store Captions */}
  const {data:session}= useSession() 
  const captionRef = useRef(null)
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  console.log(image);

   //Loading screen
  const [loading, setLoading] = useState(false);


  let [isOpen, setIsOpen] = useRecoilState(modalState)

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" flex flex-col items-center
                w-full max-w-md transform overflow-hidden 
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 
                    text-[#b368ff] relative ">
                   Create new Post
                  </Dialog.Title>
                  <div className='absolute ml-[22rem] cursor-pointer'>
                    <IoIosCloseCircleOutline
                    className='text-[1.5rem] text-red-500'
                    onClick={closeModal}/></div>

                  <div className='flex items-center w-40 h-40
                  hover:scale-75 duration-200'
                  
                  onClick={()=> imageRef.current.click()}>
                    <Image src={media}/>
                    <input type="file"
                className="hidden" ref={imageRef}
                onChange= {addImageToState}/>
                    </div>

                  <div className="mt-2">
                    <input className="text-sm pl-4 rounded-lg p-[.5rem]
                     bg-slate-200 text-black outline-0"
                     ref={captionRef} // To store Captions
                    placeholder='Please enter a caption'/>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-[#b368ff] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={uploadPost} >
                        {loading? 'Loading': 'Post'}
                      Upload </button>
                  </div>
                  <div className='p-4'>
                    {image ?(
                      <div className='' onClick={()=>
                      setImage('')}>
                        <img src={image} className='rounded-[1.3rem]' alt="" />
                      </div>
                    ):('')}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

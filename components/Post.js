import React, { useEffect, useState } from "react";
import Image from 'next/image'
import dots from '../assests/dots.png'
import hearth from '../assests/hearth.png'
import hearth2 from '../assests/hearth2.png'
import comment2 from '../assests/comment.png'
import message from '../assests/message.png'
import save from '../assests/save.png'
import emojy from '../assests/emojy.png'
import Moment from 'react-moment'
import { addDoc,collection,deleteDoc,doc,onSnapshot,
  orderBy,query,serverTimestamp,setDoc,
   } from 'firebase/firestore'
  import { db } from "../firebase";
  import { useSession} from "next-auth/react";

const Post = ({id,username,userImg,caption,timestamp,
img}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();
  const [likes,setLikes] = useState([])
  const [comments,setComments]= useState([])
  const [comment,setComment]= useState('')
  console.log(comments)

  //Likes update in db thn update like in app also
  useEffect( ()=>
  onSnapshot(collection(db,'posts',id,'likes'),
  (snapshot)=>
  setLikes(snapshot.docs)),
  [db,id] )
  
  //creating color like effect
  useEffect( ()=>
  setHasLiked(
    likes.findIndex((like)=>
    like.id===session?.user?.uid)!== -1
  ), [likes] )

  //when clicked once add like
  //on 2times click delete it
  const likePost = async ()=>{
    //already liked so delete
    if(hasLiked){
      await deleteDoc(doc(db,'posts',id,'likes',
      session?.user?.uid))
    }
    // creating like and storing info
    else{
      await setDoc(doc(db,'posts',id,'likes',
      session?.user?.uid),{
        username: session?.user?.name,
      })
    }
  }

//Send comments to db
  const sendComment= async(e)=>{
    e.preventDefault()  //prevents from page reload
    const commentToSend = comment
    setComment('')  //delete the previous comment
    await addDoc(collection(db,'posts',id,'comments'),{
      comment: commentToSend,
      username: session?.user?.name,
      image: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }
  //showing comment in web page now 
  useEffect(()=>
  onSnapshot( query(
    collection(db,'posts',id,'comments'),
    orderBy('timestamp','desc')
  ),
  (snapshot)=>setComments(snapshot.docs)
  ),
  [db, id] )

  return (
    <div className='border rounded-[1.6rem] my-3
     dark:bg-black dark:text-white dark:border-[#b368ff]'>
       {/* Header*/}
       <div className='flex items-center p-3'>
        <div className='flex items-center w-full'>
        <div className='h-9 w-9 mr-3'>
            <img src = {userImg} className='rounded-full' alt="" />
        </div>
        <div className=''>
            <p className='font-semibold text-sm'>{username}</p>
            <p className='text-xs dark:text-[#b368ff]'>Original Audio</p>
        </div>
       </div>
       <div className='w-6 h-6'>
        <Image src={dots} className=''/>
       </div>
       </div>

       {/* Photo we can upload now with img tag from
       firebase*/}
       <div>
            <img src={img} 
             className=' w-full rounded-[1rem]' alt="" /> 
       </div>

       {/* Button*/}
       <div className='m-4'>
       <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <div className='Btn dark:bg-black' onClick={likePost}>
            <Image src={hasLiked? hearth2: hearth}className='dark:bg-white p-[1px] rounded-full' />
          </div>
          <div className='Btn'>
            <Image src={comment2} className='dark:bg-[#b368ff] rounded-full'/>
          </div>
          <div className='Btn'>
            <Image src={message} className='dark:bg-[#b368ff] p-[1px] rounded-full'/>
          </div>
        </div>
        <div className='Btn'>
            <Image src={save} className='dark:bg-[#b368ff] p-[1px] rounded-full'/>
          </div>
       </div>
       <div className='m-3 customfont'>
        <p>{`${likes.length} Likes`}</p>
       </div>
       </div>
       {/* Captions*/}
       <div className='flex items-center ml-4 gap-2'>
        <p className='customfont whitespace-nowrap'>{username}</p>
        <p className='truncate'>{caption}</p>
       </div>
       <p className='text-sm text-gray-500 ml-4 mt-1'>
        {`Check previous ${comments.length} comments`}
       </p>
       {/* Comments*/}
        {comments.map((comment)=>(
          <div key={comment.id} >
          <div className='flex justify-between mx-4 p-1'>
            <div className='flex items-center truncate gap-2'>
            <div className="w-6 h-6">
                  <img src={comment.data().image} className="rounded-full" alt="" />
            </div>
              <p className='customfont'>{comment.data().username}</p>
              <p className='truncate'>{comment.data().comment}</p>
            </div> 
            <div className='h-4 w-4 shrink-0'>
               <Image src={hearth}/>
            </div>
          </div>
          </div>
        ))}
         {/* TimeStamp*/}
            <p className='text-gray-400 text-xs
            ml-2 mt-2'><Moment>{timestamp?.toDate()}</Moment></p>
            <div className='border-t'></div>
       {/* Input*/}
          <div className='flex justify-between p-2'>
            <div className='flex items-center ml-4'>
              <div className='Btn mr-2'>
                <Image src={emojy} className='dark:bg-[#b368ff] rounded-full'/>
              </div>
              <input type="text" placeholder='Add a comment'
              className='outline-0 bg-slate-200 text-black
              p-1.5	rounded-[1.5rem] pl-4'
              value={comment} onChange={(e)=>
                setComment(e.target.value)}/>
            </div>
            <button className='font-bold text-sm 
            rounded-full text-[#b368ff] w-[4rem] h-8
           bg-slate-200'
           onClick={sendComment}>Send:3</button>
          </div>
    </div>
  )
}

export default Post

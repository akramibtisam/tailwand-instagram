// import user from '../images/user.jpg'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import {db} from '../firebase/Firebase'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { red } from '@mui/material/colors';
import Fade from 'react-reveal/Fade';

function Post({ username, user_img, img, caption, id }) {
    const User=useSelector(state=>state.UserList);
    const [comments,setcomments]=useState([]);
    const [comment,setcomment]=useState(null);
    const [likes,setlikes]=useState([]);
    const [hasliked,sethasliked]=useState(false);
    console.log("liked is :",hasliked);
    console.log(likes);

    useEffect(()=>
    onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),(snapshoot)=>setcomments(snapshoot.docs))
    ,[db]
    );

    useEffect(()=>
    onSnapshot(collection(db,'posts',id,'likes'),(snapshoot)=>setlikes(snapshoot.docs))
    ,[db,id]
    );

    useEffect(()=>
        sethasliked(
            likes.findIndex((like)=>like.id===User[0]?.id) !==-1
        )
    ,[likes])

    const likePost=async (event)=>{
        if(hasliked)
        {
            await deleteDoc(doc(db,'posts',id,'likes',User[0].id));
        }
        else
        {
           
            await setDoc(doc(db,'posts',id,'likes',User[0].id),{
                username:User[0].username
            });
        }
       
    }

    const AddComment= async (event)=>{
        event.preventDefault();
        document.getElementById('comment__form').reset();
        await addDoc(collection(db,'posts',id,'comments'),{
            comment:comment,
            username:User[0].username,
            userImage:User[0].img,
            timestamp:serverTimestamp(),
        });
        
    }
    return (
        <div className='shadow-xl'>
        <Fade bottom>
        <div className='bg-white border rounded-sm my-7'>
            {/* Header */}
            <div className='flex items-center p-1 mb-2'>
                <img src={user_img} className='w-10 h-10 rounded-full object-contain border p-1 mr-2 cursor-pointer hover:border-gray-100' />
                <p className='flex-1 cursor-pointer font-bold'>{username}</p>

                <MoreHorizIcon sx={{ fontSize: 20 }} className="cursor-pointer" />

            </div>

            {/* post img */}
            <img src={img} className='w-full object-cover' />


            {/* Buttons */}
            <div className='flex m-1'>
                <div className='space-x-4 flex-1'>
                    {
                        hasliked ? <FavoriteIcon sx={{ fontSize: 20 }} sx={{ color: red[500] }} className="cursor-pointer" onClick={likePost}/>
                        :
                        <FavoriteBorderIcon sx={{ fontSize: 20  }} className="cursor-pointer" onClick={likePost}/>
                    }
                    <TextsmsOutlinedIcon sx={{ fontSize: 20 }} className="cursor-pointer" />
                    <SendOutlinedIcon className="paper__icon cursor-pointer" sx={{ fontSize: 20 }} />
                </div>
                <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} className="cursor-pointer" />
                 
            </div>
            {
                likes.length>0 && (<p className="text-xs font-semibold ml-4">{likes.length} likes</p>)
            }

            {/* Caption */}

            <div className='flex p-2'>
                <span className='font-bold mr-2'>{username}</span>
                <p className='truncate'>{caption}</p>
            </div>

            {/* comment */}
            <div>
                <form className='flex items-center p-1' id="comment__form">
                    <SentimentSatisfiedOutlinedIcon />
                    <input type="text" className='border rounded-md flex-1 focus:outline-none text-sm p-1' placeholder='Add a Comment...' onChange={(e)=>setcomment(e.target.value)} />
                    <button className='text-blue-500 font-semibold text-sm' type="submit" onClick={AddComment}>Post</button>
                </form>
            </div>

        {/* Comments */}
       {
           comments.length>0 &&
           <div className='h-20 overflow-y-scroll'>
           {comments.map((comment)=>(
               <div className='flex items-center mt-2 ml-10'>
                   <img src={comment.data().userImage} className='w-6 mr-2 object-contain rounded-full'/>
                    <p className='text-xs'>
                        <span className='font-bold mr-2'>{comment.data().username}</span>
                        <span>{comment.data().comment}</span>
                    </p>

               </div>
           ))}
           </div>
       }


        </div>
        </Fade>
        </div>
    )
}

export default Post

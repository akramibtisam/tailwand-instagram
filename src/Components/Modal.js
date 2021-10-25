import React,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { pink } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { ClickModal } from '../React-Redux/Actions';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {db, storage} from '../firebase/Firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2,8),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const open=useSelector(state=>state.Modal.open);
  const dispatch=useDispatch();
  const handleClose=()=>{
    dispatch(ClickModal(false));
  }
  const filePickerref=useRef(null);
  const captionref=useRef(null);
  const [selectfile,setselectfile]=useState(null);
  console.log("Set the selected file",selectfile);
  const User=useSelector(state=>state.UserList);

  const add__img=(event)=>{
    const reader=new FileReader();
    // console.log(event.target.files[0]);
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload=(readerEvent)=>{
      setselectfile(readerEvent.target.result);
    };
  };

  const uploadPost= async (event)=>{
    const btn=document.getElementById('btn__post');
    btn.innerText='Uploading....';
    btn.disabled=true;
    event.preventDefault();
    const docRef= await addDoc(collection(db,'posts'),{
      username:User[0].username,
      caption:captionref.current.value,
      profileImg:User[0].img,
      timestamp:serverTimestamp(),
    });
    console.log("New doc with id :",docRef.id);
    const imgref=ref(storage ,`posts/${docRef.id}/images`);
    uploadString(imgref,selectfile,"data_url").then(async snapshoot=>{
      const downloadurl= await getDownloadURL(imgref);
      updateDoc(doc(db,'posts',docRef.id),{
        image:downloadurl
      })
    });
   
    setTimeout(()=>{
      dispatch(ClickModal(false));
    },5000)

  }

  return (
    
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {
              selectfile ? <img src={selectfile} className='w-full h-40 object-contain cursor-pointer'/>
              :
              (
                  <div className='text-center cursor-pointer' onClick={()=>filePickerref.current.click()}><CameraAltOutlinedIcon sx={{color:pink[300]}}/></div>
              )
            }
            <div className='text-center'><span className='font-semibold text-sm mt-2'>Upload a photo</span></div>
            <div>
              <input type='file' hidden ref={filePickerref} onChange={add__img}/>
            </div>
            <div className='mt-2'>
              <input type='text' placeholder='Please enter a caption...' ref={captionref} className='text-sm outline-none border rounded-md focus:border-gray-400 w-full'/>
            </div>
            <button  id="btn__post" onClick={uploadPost} className='mt-2 border rounded-md border-red-400 w-60 bg-red-500 px-2 text-sm font-semibold text-white hover:bg-red-600'>Upload Data</button>
          </div>
        </Fade>
      </Modal>
  );
}

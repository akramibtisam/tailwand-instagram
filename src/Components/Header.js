import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import instalogo from '../images/instalogo.png';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { ClickModal } from '../React-Redux/Actions';
import Modal from '../Components/Modal';
import '../index.css';

function Header() {
    const User = useSelector(state => state.UserList);
    const open = useSelector(state => state.Modal.open);
    console.log(open);
    console.log(User);
    const dispatch = useDispatch();
    const ModalDisplay = (event) => {
        event.preventDefault();
        dispatch(ClickModal(true));
    }
    return (
        <div className='shadow-sm border-b bg-white z-50 sticky top-0'>
            <div className='flex justify-between max-w-6xl items-center md:mx-auto py-1'>


                {/* Web logo */}

                <div className='hidden lg:inline w-24  cursor-pointer'>
                    <img src={instalogo} className='object-contain' />
                </div>


                {/* Mobile logo */}

                <div className='lg:hidden cursor-pointer'>
                    <InstagramIcon sx={{ fontSize: 30 }} />
                </div>

                {/* input field */}

                <div className='bg-gray-50 border-2 rounded focus:bg-gray-100 px-2 flex'>
                    <SearchIcon className='text-gray-500 mr-1' />
                    <input type='text' placeholder="Search" className="search sm:text-sm" />

                </div>


                {/* header__icons */}
               
                    {
                        User.length>0 ? (
                            <div className="flex items-center space-x-4">
                            <HomeIcon className='cursor-pointer' />
                            <span className='cursor-pointer md:hidden'><MenuIcon /></span>
                            <span className='cursor-pointer hidden md:inline navBtn' onClick={ModalDisplay}><ControlPointIcon /></span>
                            <span className='cursor-pointer hidden md:inline navBtn'><PeopleOutlineIcon /></span>
                            <span className='cursor-pointer hidden md:inline navBtn'><FavoriteBorderIcon /></span>
                            <img src={User[0]?.img}  className='w-6 rounded-full object-contain cursor-pointer'/>
                            </div>
                        ) :
                            'Wecome Guest'
                    }

                    {/* <span className='cursor-pointer  rounded-full border-2 navBtn'><InstagramIcon /></span> */}
                
                {
                    open && <Modal />
                }

            </div>
        </div>
    )
}

export default Header
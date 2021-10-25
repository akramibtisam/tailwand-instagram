import user from '../images/user.jpg'
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {RemoveUser} from '../React-Redux/Actions'
function Profile() {
    const User=useSelector(state=>state.UserList);
    const dispatch=useDispatch();
    const history=useHistory();
    const SignOut = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(RemoveUser());
            console.log(User);
            history.push('/');
            
        }).catch((error) => {
            // An error happened.
            
        });
    }
    return (
        <div className='flex items-center mt-14 ml-10'>
            <img src={User[0]?.img} className='w-12 h-12 rounded-full object-contain' />
            <div className='ml-1'>
                <span className='font-bold'>{User[0]?.username}</span>
                <p className='text-sm'>Hello Insta Family.</p>
            </div>
            <buttton className='font-semibold text-blue-500 ml-2 cursor-pointer text-sm' onClick={SignOut}>Sign out</buttton>
        </div>
    )
}

export default Profile

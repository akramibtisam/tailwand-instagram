import instalogo from '../images/instalogo.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from 'react-router';
import {useDispatch,useSelector} from 'react-redux'
import {Add__User} from '../React-Redux/Actions.js';

function SignIn() {
    const history=useHistory();
    const dispatch = useDispatch();
    const User=useSelector(state=>state.UserList);
    const signInGoogle = (event) => {
        event.preventDefault();
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User is :",user);
                dispatch(Add__User({username:user.displayName,img:user.photoURL,id:user.uid}));
                console.log("User in state is:",User);

                history.push('/home');
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <div className='mt-16'>
            <img src={instalogo} className='object-contain w-52 m-auto' />
            <p className='text-sm text-center'>This is not an real app this is for educational puropose.</p>
            <div className='flex justify-center mt-32'><button className='border-blue-700 border rounded-lg bg-blue-400 hover:bg-blue-500 py-1 font-semibold text-white w-80' onClick={signInGoogle}>Sign in with Google</button></div>
        </div>
    )
}

export default SignIn

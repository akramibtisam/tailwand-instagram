import Post from "./Post"
import user from '../images/user.jpg'
import post_img from '../images/logo.jpg'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { db } from "../firebase/Firebase"

function Posts() {
    const [Post__Data, setPost__Data] = useState([]);

    useEffect(() =>
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', "desc")), (snapshoot) => {
            setPost__Data(snapshoot.docs);
        }
        ), [db]
    );

    return (
        <div>
            {
                Post__Data.map(postinfo => <Post key={postinfo.id} id={postinfo.id} username={postinfo.data().username} user_img={postinfo.data().profileImg} img={postinfo.data().image} caption={postinfo.data().caption} />)
            }

        </div>
    )
}

export default Posts
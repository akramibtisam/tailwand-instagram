import React ,{useEffect,useState}from 'react'
import faker from 'faker';
import Story from './Story';
function Stories() {

    const [suggestion ,setsuggestions]=useState([]);

    useEffect(()=>{
        const suggest=[...Array(20)].map((_,i)=>({
            ...faker.helpers.contextualCard(),
            id:i
        }))
        console.log(suggest);
        setsuggestions(suggest);
    },[])
    return (
        <div className='flex overflow-x-scroll mt-2 p-2 border-gray-50 border-2'>
            {
                suggestion.map(profile=><Story key={profile.id} username={profile.username} img={profile.avatar}/>)
            }
        </div>
    )
}

export default Stories

import React,{useState,useEffect} from 'react'
import faker from 'faker';
import Suggest from './Suggest';
function Suggestions() {
    
    const [suggest,setsuggest]=useState([]);
    useEffect(()=>{
        const suggest=[...Array(5)].map((_,i)=>({
            id:i,
            ...faker.helpers.contextualCard()
        }));
        setsuggest(suggest);
    },[])
    return (
        <div>
            <div className='flex ml-10 mt-4 mb-4'>
            <p className='text-sm font-semibold text-gray-400 mr-12'>Suggestions for you</p>
            <button className='font-semibold text-sm cursor-pointer'>See All</button>
            </div>
            <div className='space-y-2'>
            {
                suggest.map(suggestProfile=><Suggest key={suggestProfile.id} username={suggestProfile.username} img={suggestProfile.avatar} work={suggestProfile.company.name}/>)
            }
            </div>
        </div>
    )
}

export default Suggestions

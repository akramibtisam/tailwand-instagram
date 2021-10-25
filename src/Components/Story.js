import React from 'react'

function Story({username,img}) {
    return (
        <div className='space-x-1 cursor-pointer'>
            <img src={img} className='w-14 h-14 object-contain rounded-full border-2 border-red-500 p-1'/>
            <p className='text-xs w-14 truncate text-center'>{username}</p>
        </div>
    )
}

export default Story

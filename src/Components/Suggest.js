function Suggest({ username, img, work }) {
    return (
        <div className='flex items-center ml-8'>
            <img src={img} className='w-10 h-10 object-contain rounded-full mr-4' />
            <div className=''>
                <p className='text-sm font-semibold w-14 truncate'>{username}</p>
                <p className='text-xs text-gray-400 w-14 truncate'>{work}</p>
            </div>
            <button className='text-blue-500 font-semibold text-xs ml-20 cursor-pointer'>Follow</button>
        </div>
    )
}

export default Suggest

import Posts from './Posts'
import Stories from './Stories'
import Profile from './Profile'
import Suggestions from './Suggestions'
function Feed() {
    
    return (
        <main className='bg-gray-50 h-screen grid grid-cols-1
         md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>
        <div className='col-span-2'>
            <Stories />
            <Posts/>
        </div>
        <div className='hidden xl:inline-grid md:col-span-1'>
            <div>
                <Profile/>
                <Suggestions/>
                </div>
        </div>
        </main>
    )
}

export default Feed
 
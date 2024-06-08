import React from 'react'

const PostProfile = ({data}) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <div className='flex justify-between items-center w-full  '>
            <h4 className="text-xl text-gray-900 font-bold">Posts </h4>
            <div className='flex border border-gblue-700 px-2 py-1 rounded-3xl'>
                create a post 
            </div>
        </div>
            <p className="mt-2 text-gray-700 text-center ">
                { !data ?  data : <button className='border border-gblue-400 px-2 py-1 rounded-full mt-4' > add post </button>  }
            </p>
    </div>
  )
}

export default PostProfile

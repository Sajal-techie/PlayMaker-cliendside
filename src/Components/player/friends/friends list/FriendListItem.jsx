import React from 'react'

const FriendListItem = ({ name, bio, id, profileImage }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4 font-kanit">
      <img className="w-14 h-14 rounded-full" src={profileImage || "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} alt={name} />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{bio}</p>
        <p className="text-gray-500 text-sm">{id}</p>
      </div>
      <div className="ml-auto flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded flex">
            <span className='md:block hidden'>Message</span>  &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
        </button>

        <button className="px-4 py-2 bg-gray-300 rounded">...</button>
      </div>
    </div>
  )
}

export default FriendListItem

import React from 'react'

const FriendRequestItem = ({ name, mutualFriends, profileImage }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img className="w-24 h-24 rounded-full mb-4" src={profileImage} alt={name} />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 mb-4">{mutualFriends} mutual friends</p>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
        <button className="px-4 py-2 bg-gray-300 rounded">Delete</button>
      </div>
    </div>
  )
}

export default FriendRequestItem

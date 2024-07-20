import React, { useEffect, useState } from 'react'
import userApi from '../../../../api/axiosconfig'
import FriendRequestItem from './FriendRequestItem'
import FriendSidebar from '../FriendSidebar'
import Navbar from '../../../layouts/navbar/Navbar'
import SideBarLayout from '../SideBarLayout'

const FriendRequest = () => {
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(()=>{
        fetchFriendRequests()


    },[])

    const fetchFriendRequests = async ()=>{
        try{
            const response  = await userApi.get('friend_request')
            console.log(response);
            setFriendRequests(response.data)
        }catch(error){
            console.log(error);
        }
    }
    const handleAccept = (id)=>{

    }
    const handleDelete = (id)=>{

    }
    console.log(friendRequests);
  return (
    <>
    <Navbar />
    <SideBarLayout >

    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Friend requests</h2>
          <a href="#" className="text-blue-500 hover:underline">See all</a>
        </div>
        {
            friendRequests.length > 0 ? 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="bg-gray-100 rounded-lg overflow-hidden">
              <img src={request.user.profilePicture} alt={request.user.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{request.user.name}</h3>
                <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                <button
                  onClick={() => handleConfirm(request.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600"
                  >
                  Confirm
                </button>
                <button
                  onClick={() => handleDelete(request.id)}
                  className="w-full bg-gray-200 text-black py-2 rounded mt-2 hover:bg-gray-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        :
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>No pending request </div>
      }
      </div>
    </div>
    </SideBarLayout>
  </>
  )
}

export default FriendRequest

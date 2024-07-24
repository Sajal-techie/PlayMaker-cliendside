import React, { useEffect, useState } from 'react'
import userApi from '../../../../api/axiosconfig'
import FriendRequestItem from './FriendRequestItem'
import FriendSidebar from '../FriendSidebar'
import Navbar from '../../../layouts/navbar/Navbar'
import SideBarLayout from '../SideBarLayout'
import { baseUrl } from '../../../../api/api'
import { useQueryClient } from 'react-query'

const FriendRequest = () => {
    const [friendRequests, setFriendRequests] = useState([])
    const queryClient = useQueryClient()

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
    const handleAccept = async (id)=>{
      console.log(id);
      try{
        const res = await userApi.post(`friend_request_accept/${id}`)
        console.log(res);
        fetchFriendRequests()
        queryClient.invalidateQueries('profile')
      }catch(error){
        console.log(error,'error accepting request');
      }
    }
    const handleDelete = (id)=>{

    }
    console.log(friendRequests);
  return (
    <>
    <Navbar />
    <SideBarLayout >

    <div className="container mx-auto p-4 font-kanit">
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Friend requests</h2>
          {/* <a href="#" className="text-blue-500 hover:underline">See all</a> */}
        </div>
        {
            friendRequests.length > 0 ? 
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center">
              <img src={request.from_user.profile_photo ? baseUrl+request.from_user.profile_photo:"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} 
                      alt={request.from_user.username} className="w-32 h-32 sm:w-48 sm:h-48" />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{request.from_user.username}</h3>
                {/* <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p> */}
                <button
                  onClick={() => handleAccept(request.from_user.id)}
                  className="w-full bg-blue-500 text-white py-2 px-5 rounded mt-2 hover:bg-blue-600"
                  >
                  Confirm
                </button>
                <button
                  onClick={() => handleDelete(request.from_user.id)}
                  className="w-full bg-gray-200 text-black py-2 px-5 rounded mt-2 hover:bg-gray-300 border border-gblue-100"
                >
                  Ignore
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

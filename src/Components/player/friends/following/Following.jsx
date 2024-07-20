import React, { useEffect, useState } from 'react'
import Navbar from '../../../layouts/navbar/Navbar'
import SideBarLayout from '../SideBarLayout'
import FriendListItem from '../friends list/FriendListItem'
import userApi from '../../../../api/axiosconfig'

const Following = () => {
    const [following,setFollowing] = useState([])

    useEffect(()=>{
        fetchFollowings()
    },[])
    const fetchFollowings = async () =>{
        try{
            const response = await userApi.get('follow')
            console.log(response);
            setFollowing(response.data)
        }catch(error){
            console.log(error);
        }
    } 
  return (
    <>
    <Navbar />
    <SideBarLayout >
    <div className="flex-grow p-8 bg-gray-100 min-h-screen font-kanit">
      <h1 className="text-2xl font-bold mb-4">Following</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
        {
            following.length > 0 ? 
            <div>
            {following.map((friend, index) => (
                <FriendListItem
                key={index}
                name={friend.username}
                bio={friend.bio}
                id={friend.id}
                profileImage={friend.profile_photo}
                />
            ))}
        </div>
        :
        <div className='flex items-center p-4 bg-white shadow-md rounded-lg mb-4'>
            No followings
        </div>
        }
    </div>
    </SideBarLayout>
    </>
  )
}

export default Following

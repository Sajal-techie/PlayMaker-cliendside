import React, { useEffect, useState } from 'react'
import FriendListItem from './FriendListItem';
import FriendSidebar from '../FriendSidebar';
import Navbar from '../../../layouts/navbar/Navbar';
import SideBarLayout from '../SideBarLayout';
import userApi from '../../../../api/axiosconfig';
import BottomNavbar from '../../../layouts/navbar/BottomNavbar';

const FriendList = () => {
    const [friends,setFriends] = useState([])

    useEffect(()=>{
        fetchFriends()
    },[])

    const fetchFriends = async () =>{
        try{
            const response = await userApi.get('friends')
            console.log(response);
            setFriends(response.data)
        }catch(error){
            console.log(error);
        }
    } 
      console.log(friends);
  return (
    <>
    <Navbar />
    <SideBarLayout >
    <div className="flex-grow p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {
        friends.length > 0 ?
        <div>
            {friends.map((friend, index) => (
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
    <BottomNavbar />
    </>
  )
}

export default FriendList

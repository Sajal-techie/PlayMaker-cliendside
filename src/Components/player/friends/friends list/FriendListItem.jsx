import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import userApi from '../../../../api/axiosconfig';
import { useSelector } from 'react-redux';

const FriendListItem = ({ name, bio, id, profileImage, type, fetchData, suggestion }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sender_id = useSelector(state=>state.auth.user_id)

  const handleNavigate = (id) => {
    if (type === 'player') {
      navigate(`/profile/${id}`);
    } else {
      navigate(`/academy/profile/${id}`);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleBlock = () => {
    console.log('Block user:', id);
    setDropdownVisible(false);
  };

  const handleUnfriendOrUnfollow = async (id) => {
    if (type === 'player') {
      console.log('Remove friend:', id);
      try{
        const res  =  await userApi.delete(`friends/${id}`)
        console.log(res);
      }catch(error){
        console.log(error, 'remove friends');
      }
    } else {
      console.log('Unfollow academy:', id);
      try{
        const res = await userApi.post('unfollow',{'academy':id})
        console.log(res, 'unfollow');
      }catch(error){
        console.log(error, 'error unfollowing');
      }
    }
    fetchData()
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  const handleMessageClick = async () =>{
    console.log(sender_id,id,'two ids');
    try{
      const response = await userApi.post(`chat`,{
        sender_id:sender_id,
        receiver_id:id
      })
      console.log(response, 'thread response');
      const { thread_name } = response.data
      navigate(`/chat/${thread_name}`)
      
    }catch(error){
      console.log(error, 'erro geting thread name');
    }
  }

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4 font-kanit relative">
      <img
        className="w-14 h-14 rounded-full cursor-pointer"
        src={profileImage ? baseUrl + profileImage : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"}
        alt={name}
        onClick={() => handleNavigate(id)}
      />
      <div className="ml-4 cursor-pointer" onClick={() => handleNavigate()}>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{bio}</p>
      </div>
      { 
        suggestion ? 
        <><div className="ml-auto flex space-x-2 relative">
        <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center" onClick={()=>navigate(`/profile/${id}`)}>
          <span className=''>View profile</span> &nbsp;
        </button>

        {/* <button className="px-4 py-2 bg-gray-300 rounded relative" onClick={handleDropdownToggle}>...</button> */}
      </div></>:

        <div className="ml-auto flex space-x-2 relative">
        <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center" onClick={()=>handleMessageClick()}>
          <span className='md:block hidden'>Message</span> &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </button>

        <button className="px-4 py-2 bg-gray-300 rounded relative" onClick={handleDropdownToggle}>...</button>
        {dropdownVisible && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {/* <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
              onClick={handleBlock}
            >
              Block
            </button> */}
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
              onClick={()=>handleUnfriendOrUnfollow(id)}
            >
              {type === 'player' ? 'Remove Friend' : 'Unfollow'}
            </button>
          </div>
        )}
      </div>}
    </div>
  );
};

export default FriendListItem;

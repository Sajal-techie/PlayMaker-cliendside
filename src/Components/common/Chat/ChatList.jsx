// src/components/ChatList.js
import React, { useState, useEffect } from 'react';
import { Link, useAsyncError, useNavigate, useParams } from 'react-router-dom';
import userApi from '../../../api/axiosconfig';
import { baseUrl } from '../../../api/api';
import { useSelector } from 'react-redux';


const ChatList = ({resetPage}) => {
    const [chatList, setChatList] = useState([])
    const user_id = useSelector(state=>state.auth.user_id)
    const {threadName} = useParams()
    const navigate = useNavigate()

  useEffect(() => {
   fetchChatList()
  }, []);

  const fetchChatList = async ()=>{
    try{
        const response = await userApi.get(`chat_list`)
        console.log(response,' chat list fethced======');
        setChatList(response.data)
    }catch(error){
        console.log(error, 'error fethcign user list');
    }
  }
  const handleUserClick = async (receiverId)=>{
    try{
        const response = await userApi.post('chat',{
          'sender_id': user_id,
          'receiver_id': receiverId
        })
        console.log(response, 'user clicked');
        const {thread_name} = response.data
        navigate(`/chat/${thread_name}`)
    }catch(error){
      console.log(error, ' errro fetching thread name');
    }
    console.log(resetPage,'resetnpage');
    
    resetPage()
  }
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4">
        <div className="flex flex-row items-center justify-between text-sm">
          <span className="font-bold">Messages</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {chatList.length}
          </span>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto px-4">
        {chatList.map((user, index) => (
          <button key={index} onClick={()=>handleUserClick(user.id)}
            className={` flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-full ${(threadName && threadName?.split('_').indexOf(`${user.id}`) !== -1) ?'bg-blue-100 border-l-4 border-blue-500':'' }`}
          >
            <div className="flex items-center justify-center h-10 w-10 bg-indigo-200 rounded-full">
              <img className='rounded-full object-cover h-10 w-10' 
                   src={user.profile_photo ? baseUrl + user.profile_photo : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} 
                   alt="" />
            </div>
            <div className="ml-2 text-sm font-semibold">{user.username}</div>
            {
              (threadName && threadName?.split('_').indexOf(`${user.id}`) !== -1) &&
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>
            }
            {/* {user.last_message && (
                  <div className={`text-xs ${user.last_message.is_sender ? 'text-gray-500' : user.last_message.read ? 'text-gray-500' : 'text-red-500'}`}>
                      {user.last_message.message}
                  </div>
              )} */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
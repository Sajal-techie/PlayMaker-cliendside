import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userApi from '../../../api/axiosconfig';
import {useSelector} from 'react-redux'
import { dateDifference } from '../functions/dateDifference';
import Navbar from '../../layouts/navbar/Navbar';
import { baseUrl } from '../../../api/api';
import ChatLayout from './ChatLayout';
import BottomNavbar from '../../layouts/navbar/BottomNavbar';
import ChatLandingPage from './ChatLandingPage';
import chatbg from '../../../assets/chatbg.png'
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null)
  const { threadName } = useParams();
  const [image,setImage] = useState(null)
  const [username,setUsername] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [chatPartner,setChatPartner] = useState(null)

  const messageEndRef = useRef(null);
  const navigate = useNavigate()

  const {user_id, role} = useSelector(state=>state.auth)

  const fetchMessages = async ()=>{
    try{
        const response = await userApi.get(`chat`,{
            params:{
                threadName
            }
        })
        console.log(response, 'chat fetched');
        setMessages(response.data)
        if (response.data.length > 0){
            const partner = response.data[0].sender.id === user_id ? response.data[0].receiver : response.data[0].sender
            setChatPartner(partner)
        }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(()=>{

      if (threadName){
        fetchMessages()

        const websocket =  new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/ws/chat/${threadName}/`)
        
        console.log(websocket);
        websocket.onopen = ()=>{
            console.log('web socket connected');
            setIsConnected(true)
            setSocket(websocket)
        }
        websocket.onerror = (error)=>{
            console.log(error, 'eror connectin socket');
        }
        websocket.onclose = ()=>{
            console.log('web socket disconnected in Chat');
            setIsConnected(false)
        }
        websocket.onmessage = (event) => {
            console.log(event);
            const data = JSON.parse(event.data)
            console.log(data);
            setMessages(prevMessages=>[...prevMessages, data])
        }
        return ()=>{
            websocket.close()
        }
    }

  },[threadName])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
        console.log(messages);
        const receiverId = messages[0]?.sender?.id === user_id ? messages[0]?.receiver?.id : messages[0]?.sender?.id;
        console.log(receiverId,'reciver id');
        socket.send(JSON.stringify({
            message: inputMessage,
            sender: user_id,
            receiver: receiverId
        }));
        setInputMessage('');
    }
  };

  return (
    <>
    <Navbar academy={role==='academy'}/>
    <ChatLayout>
        {
            (messages.length > 0 && threadName) ?
            <div className="flex flex-col flex-auto h-full mb-16 sm:mb-0">
                {
                    chatPartner && (
                        <div className='border m-1 mt-20 sm:mt-0'>
                            <div className="bg-white shadow-md p-3 flex items-center">
                                <img 
                                src={chatPartner.profile_photo ? baseUrl + chatPartner.profile_photo : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} 
                                alt={chatPartner.username} 
                                className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                <h2 className="text-lg font-semibold">{chatPartner.username}</h2>
                                <p className="text-sm text-gray-600">{chatPartner.bio || ''}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="flex-grow overflow-y-auto p-4  bg-contain bg-slate-400">
                    <div className="grid grid-cols-12 gap-y-2 ">
                        {
                            messages.map((message, index)=>(
                                message.message && 
                                <div className={`${message.sender?.id === user_id ? 'col-start-6 col-end-13 ' : 'col-start-1 col-end-8'}  p-3 rounded-lg`} key={index}>
                                    <div className={`flex ${message.sender?.id === user_id ? 'justify-start flex-row-reverse' : 'flex-row'}  items-center`}>
                                        <div
                                        className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 flex-shrink-0"
                                        >
                                        <img className='rounded-full w-12 h-12 object-cover border border-gblue-500 ' src={message?.sender?.profile_photo ? baseUrl+message.sender.profile_photo : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} alt="profile" />
                                        </div>
                                        <div
                                        className={` ${message.sender?.id === user_id ? 'mr-3 bg-indigo-100':'ml-3'} relative text-sm bg-white py-2 px-4 shadow rounded-xl`}
                                        >
                                            <div>{message.message}</div>
                                            <p className="text-xs mt-1 text-gray-500">{dateDifference(message.date)}</p>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                        <div ref={messageEndRef}/>
                </div>
                <form onSubmit={handleSubmit} className='p-2'>      
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow">
                                <input
                                type="text"
                                value={inputMessage}
                                onChange={(e)=>setInputMessage(e.target.value)}
                                placeholder='message'
                                className="w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />
                        </div>
                        <div className="ml-4">
                            <button type='submit'
                                className="flex items-center justify-center bg-gblue-500 hover:bg-gblue-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                >
                                <span>Send</span>
                                <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth  ="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            : <div><ChatLandingPage/></div>
        }    
    </ChatLayout>
    <BottomNavbar academy={role==='academy'}/>
    </>
  );
};

export default Chat;
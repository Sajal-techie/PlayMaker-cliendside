import React from 'react'
import chatimage from '../../../assets/chat.png'
import ChatList from './ChatList'
const ChatLandingPage = ({resetPage}) => {
  return (
    <>
    {/* show chat list in mobile  */}
    <div className='sm:hidden'>
        <ChatList  resetPage={resetPage} /> 
    </div>
    {/* show welcome message in larger screens */}
    <div className="sm:flex flex-col items-center justify-center h-full hidden">
      <img src={chatimage} alt="Message Icon" className="w-32 h-32 mb-4 mt-10" />
      <h2 className="text-2xl font-semibold mb-2">Welcome to Messages</h2>
      <p className="text-gray-600 text-center">Select a chat to start messaging or create a new conversation.</p>
    </div>
    </>
  )
}

export default ChatLandingPage

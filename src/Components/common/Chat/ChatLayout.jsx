import React from 'react'
import ChatList from './ChatList'

const ChatLayout = ({children}) => {
  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <ChatList />
            {children}
        </div>
    </div>
  )
}

export default ChatLayout

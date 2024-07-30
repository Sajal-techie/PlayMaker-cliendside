import React from 'react'
import ChatList from './ChatList'

const ChatLayout = ({children}) => {
  return (
    <div className="flex h-[calc(100vh-64px)] antialiased text-gray-800">
      <div className="flex flex-col sm:flex-row h-full w-full overflow-hidden">
        <div className="hidden sm:block sm:w-64 flex-shrink-0">
          <ChatList />
        </div>
        <div className="flex-grow overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ChatLayout

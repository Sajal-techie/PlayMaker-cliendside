import React, { useState } from 'react'
import ChatList from './ChatList'
import Navbar from '../../layouts/navbar/Navbar'
import BottomNavbar from '../../layouts/navbar/BottomNavbar'
import { useSelector } from 'react-redux'
import Chat from './Chat'

const ChatLayout = () => {

  const [page, setPage] = useState(1)
  const {role} = useSelector(state=>state.auth)

  const handlePageChange = ()=>{
    setPage(prevPage => prevPage + 1)
  }

  const resetPage = ()=>{
    setPage(1)
  }
  return (
    <>
    <Navbar academy={role==='academy'}/>
      <div className="flex h-[calc(100vh-64px)] antialiased text-gray-800">
        <div className="flex flex-col sm:flex-row h-full w-full overflow-hidden">
          <div className="hidden sm:block sm:w-64 flex-shrink-0">
            <ChatList resetPage={resetPage}/>
          </div>
          <div className="flex-grow overflow-hidden">
            {/* {children} */}
            <Chat page={page} handlePageChange={handlePageChange} />
          </div>
        </div>
      </div>
      <BottomNavbar academy={role==='academy'}/>
    </>
  )
}

export default ChatLayout

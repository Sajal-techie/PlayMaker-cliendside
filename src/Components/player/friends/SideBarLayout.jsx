import React from 'react'
import FriendSidebar from './FriendSidebar'

const SideBarLayout = ({children}) => {
  return (
    <div className="flex min-h-screen">
      <FriendSidebar />
      <main className="flex-1 lg:ml-60 md:ml-52 sm:ml-48 ml-10 p-4 pb-20 sm:pb-4">
        {children}
      </main>
    </div>
  )
}

export default SideBarLayout

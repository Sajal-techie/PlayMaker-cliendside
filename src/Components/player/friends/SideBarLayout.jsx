import React from 'react'
import FriendSidebar from './FriendSidebar'

const SideBarLayout = ({children}) => {
  return (
    <div className="flex min-h-screen">
      <FriendSidebar />
      <main className="flex-1 lg:ml-60 md:ml-52 sm:ml-48 ml-20 p-4">
        {children}
      </main>
    </div>
  )
}

export default SideBarLayout

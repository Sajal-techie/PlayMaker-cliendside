import React from 'react'
import FriendSidebar from './FriendSidebar'

const SideBarLayout = ({children}) => {
  return (
    <div className="flex min-h-screen">
      <FriendSidebar />
      <main className="flex-1 ml-60 p-4">
        {children}
      </main>
    </div>
  )
}

export default SideBarLayout

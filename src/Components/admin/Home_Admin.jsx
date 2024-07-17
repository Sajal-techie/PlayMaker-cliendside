import React, { useState } from 'react'
import Dashboard from './Dashboard/Dashboard'
import AdminNavbar from './contents/AdminNavbar'
import AdminSidebar from './contents/AdminSidebar'

const Home_Admin = () => {

  return (
    <>
        <div>
            <AdminNavbar/>
            <div className="flex overflow-hidden bg-white pt-16">
              <AdminSidebar/>
            </div>
        </div>
      <Dashboard />
    </>
  )
}

export default Home_Admin

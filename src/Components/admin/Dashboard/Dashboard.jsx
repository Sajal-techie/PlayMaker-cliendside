import React, { useState } from 'react'
import AdminNavbar from '../contents/AdminNavbar';
import AdminSidebar from '../contents/AdminSidebar';
import ChartCard from './ChartCard';
import AcademyTable from './AcademyTable';
import SquareCards from './SquareCards';
import PlayerTable from './PlayerTable';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const isSidebarOpen = useSelector(state=>state.admin.isSidebarOpen)
    console.log(isSidebarOpen);
  return (
        <>
            <div id="main-content" className={`h-full w-full bg-gray-100 relative overflow-y-auto transition-margin duration-75 ${
                    isSidebarOpen ? 'ml-64' : ''}`}
                >
                    <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <ChartCard/>
                        <AcademyTable />
                    </div>
                    <SquareCards/>
                    <PlayerTable/>
                    </div>
            </div>
        </>
  )
}

export default Dashboard

import React, { useEffect, useState } from 'react'
import AdminNavbar from '../contents/AdminNavbar';
import AdminSidebar from '../contents/AdminSidebar';
import ChartCard from './ChartCard';
import SquareCards from './SquareCards';
import PlayerTable from './PlayerTable';
import { useSelector } from 'react-redux';
import userApi from '../../../api/axiosconfig';
import RecentTrials from './RecentTrials';

const Dashboard = () => {
    const isSidebarOpen = useSelector(state=>state.admin.isSidebarOpen)
    console.log(isSidebarOpen);
    const [players, setPlayers] = useState([])
    const [academies, setAcademies] = useState([])
    const [weeklyData, setWeeklyData] = useState([])
    const [stats, setStats] = useState([])
    const [trials, setTrials] = useState([])

    useEffect(()=>{
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async ()=>{
        try{

            const response = await userApi.get('dashboard')
            console.log(response);
            setPlayers(response.data.players)
            setAcademies(response.data.academies)
            setWeeklyData(response.data.weekly_data)
            setStats(response.data.stats)
            setTrials(response.data.trials)

        }catch(error){
            console.log(error, 'erro fetching dashbaord data');
        }
    }

  return (
        <>
            <div id="main-content" className={`h-full w-full bg-gray-100 relative overflow-y-auto transition-margin duration-75 ${
                    isSidebarOpen ? 'ml-64' : ''}`}
                >
                    <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <ChartCard stats={stats}/>
                        <RecentTrials trials={trials} />
                    </div>
                    <SquareCards weeklyData={weeklyData}/>
                    <PlayerTable players={players} academies={academies}/>
                    </div>
            </div>
        </>
  )
}

export default Dashboard

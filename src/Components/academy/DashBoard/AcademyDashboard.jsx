import React, { useEffect, useState } from 'react';
import AcademyStats from './AcademyStats';
import PopularPosts from './PopularPosts';
import PlayerEngagement from './PlayerEngagement';
import UpcomingTrials from './UpcomingTrials';
import Navbar from '../../layouts/navbar/Navbar';
import BottomNavbar from '../../layouts/navbar/BottomNavbar';
import PaymentInfo from './PaymentInfo';
import userApi from '../../../api/axiosconfig';
import DashboardSkelton from '../../../Pages/Skeltons/DashboardSkelton';

const AcademyDashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        fetchDashboardData()
    }, []);

    const fetchDashboardData = async () =>{
        try{
            const response = await userApi.get('academy_dashboard')
            console.log(response);
            setDashboardData(response.data)
        }catch(error){
            console.log(error, 'error fetching dashboard data');
        }
    }
    if (dashboardData.length === 0) return<DashboardSkelton/>;

    return (
        <>
        <Navbar academy={true}/>
            <div id="main-content" className={`h-full w-full bg-gray-100 relative overflow-y-auto transition-margin duration-75 px-20 py-6`}>
                <div className="pt-6 px-4">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-6">Academy Dashboard</h1>
                    
                    <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <AcademyStats stats={dashboardData.stats} />
                        <PlayerEngagement engagement={dashboardData.playerEngagement} />
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <UpcomingTrials trials={dashboardData.upcomingTrials} />
                        <PopularPosts posts={dashboardData.popularPosts} fetchDashboardData={fetchDashboardData}/>
                    </div>
                    <div className="mt-8">
                        <PaymentInfo payments={dashboardData.payments} />
                    </div>
                </div>
            </div>
            <BottomNavbar academy={true} />
        </>
    );
}

export default AcademyDashboard;
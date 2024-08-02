import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartCard = ({stats}) => {
   if (!stats) {
      return <div>Loading stats...</div>;
    }
    const data = {
      labels: ['Academies', 'Players', 'Trials', 'Posts'],
      datasets: [
        {
          label: 'Total Count',
          data: [stats.totalAcademies, stats.totalPlayers, stats.totalTrials, stats?.totalPosts],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 200, 0.6)',
          ],
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Overall Statistics',
        },
      },
    };
  
    return (
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Overall Statistics</h3>
        <Bar data={data} options={options} />
      </div>
    );
}

export default ChartCard

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AcademyStats = ({ stats }) => {
  const data = {
    labels: ['Total Trials', 'Completed Trials', 'Upcoming Trials', 'Cancelled Trials'],
    datasets: [
      {
        label: 'trials',
        data: [stats.totalTrials, stats.completedTrials, stats.upcomingTrials, stats.cancelledTrials],
        backgroundColor: [
          'rgba(0, 131, 255, 0.7)',
          'rgba(0, 255, 0, 0.7)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 0, 0, 0.9)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trial Overview',
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AcademyStats;
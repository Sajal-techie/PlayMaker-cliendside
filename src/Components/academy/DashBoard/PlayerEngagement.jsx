import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PlayerEngagement = ({ engagement }) => {
  const data = {
    labels: ['Followers', 'Trial Participants', 'Post Interactions'],
    datasets: [
      {
        data: [engagement.followers, engagement.trialParticipants, engagement.postInteractions],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
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
        text: 'Player Engagement',
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PlayerEngagement;
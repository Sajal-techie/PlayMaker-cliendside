import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingTrials = ({ trials }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-bold text-gray-900">Upcoming Trials</h3>
      <Link to="/academy/list_trials" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">
        View all
      </Link>
    </div>
    <div className="flex flex-col mt-8">
      <div className="overflow-x-auto rounded-lg">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden sm:rounded-lg">
          {
            trials.length > 0 ? 
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trial Name
                  </th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport
                  </th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                      {trials.map((trial, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900  hover:underline hover:text-indigo-400"><Link to={`/academy/trial_details/${trial.id}`}>{trial.name}</Link> </td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-500">{new Date(trial.trial_date).toDateString()}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-500">{trial.sport}</td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {trial.is_registration_fee ? <>₹{trial.registration_fee}</> : 'Free'}
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
              :
              <div className='text-center text-white px-4 py-3 '>
                <Link  to={'/academy/add_trial'} className='px-4 py-2 bg-indigo-500 font-bold'>
                  Create new Trial
                </Link>
              </div>
            }
            </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default UpcomingTrials;
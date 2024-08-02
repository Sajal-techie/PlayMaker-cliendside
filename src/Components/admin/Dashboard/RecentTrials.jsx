import React from 'react'
import { Link } from 'react-router-dom'

const RecentTrials = ({trials}) => {
    console.log(trials);
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
        <div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Trials</h3>
            {/* <span className="text-base font-normal text-gray-500">This is a list of latest transactions</span> */}
        </div>
        <div className="flex-shrink-0">
            <Link to={'/admin/trialview'} className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</Link>
        </div>
        </div>
        <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trial 
                            </th>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date 
                            </th>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fees
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white">
                        {
                            trials?.map((trail,index)=>(
                            <tr className="bg-gray-50" key={index}>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    {trail.name} <span className="font-semibold">{trials.sport}</span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    {trials.created_at}
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {
                                    trail.is_registration_fee ? <>₹{trail.registration_fee}</>  : 'Free'
                                }
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default RecentTrials

import React from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../../api/api'

const PlayerTable = ({players, academies}) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">New Players</h3>
            <Link to={'/admin/playerview'} className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
            View all
            </Link>
        </div>
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
                {
                    players.map((player,index)=>(
                            <li className="py-3 sm:py-4" key={index}>
                        <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8 rounded-full" 
                            src={player.userprofile__profile_photo ? baseUrl+'/media/'+player.userprofile__profile_photo : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} alt="Neil image"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                               {player.username}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                <span>{player.userprofile__district},  {player.userprofile__state}</span>
                            </p>
                        </div>
                        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            $320
                        </div> */}
                        </div>
                    </li> 
                    ))
                }
            </ul>
        </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">New Academies</h3>
            <Link to={'/admin/academyview'} className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
            View all
            </Link>
        </div>
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
                {
                    academies.map((academy,index)=>(
                        <li className="py-3 sm:py-4" key={index}>
                        <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8 rounded-full" 
                            src={academy.userprofile__profile_photo ? baseUrl+'/media/'+academy.userprofile__profile_photo : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} alt="Neil image"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                               {academy.username}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                <span>{academy.userprofile__district},  {academy.userprofile__state}</span>
                            </p>
                        </div>
                        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            $320
                        </div> */}
                        </div>
                    </li> 
                    ))
                }
            </ul>
        </div>
        </div>
    </div>
  )
}

export default PlayerTable

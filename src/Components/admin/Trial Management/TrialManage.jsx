import React, { useEffect, useState } from 'react'
import { useTrialAcademy } from '../../academy/Custom Hooks/useTrialAcademy'
import { Navigate, useNavigate } from 'react-router-dom'
import Skelton1 from '../../../Pages/Skelton1'
import AdminNavbar from '../contents/AdminNavbar'
import AdminSidebar from '../contents/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../../redux/slices/adminSlice'
import { convertTo12HourFormat } from '../../common/functions/covertTime'

const TrialManage = () => {
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(10)
    const [searchTerm,setSearchTerm] = useState('')
    const {data:trialList,isLoading,isError} = useTrialAcademy(page,pageSize,searchTerm)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSidebarOpen = useSelector(state=>state.admin.isSidebarOpen)

    const currentDate = new Date()
    const totalPages = trialList?.count ? Math.ceil(trialList.count / pageSize) : 1

    useEffect(()=>{
        dispatch(toggleSidebar(false))
    },[])


    if (isLoading) return <Skelton1 />
    if (isError) <Navigate to={'/admin/home'} />

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);  // Reset to first page when page size changes
  };

    // to handle search input
  const handleSearch = (e) => {
        setSearchTerm(e.target.value);
  }


  return (
    <>
    <AdminNavbar />
    <AdminSidebar/>
    <br /><br /><br />
        <div className={`capitalize container mx-auto p-6 font-kanit h-full w-full bg-gray-100 relative overflow-y-auto transition-margin duration-75 ${
                    isSidebarOpen ? 'ml-64' : ''}`}>
            <div className="mb-4 flex justify-between items-center bg-gray-200 px-4 py-1">
                <h1 className="text-2xl font-bold">Trial Management</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-2 rounded px-4 py-2"
                />
            </div>
        <table className="border border-gray-300  min-w-full bg-white">
            <thead className="whitespace-nowrap">
            <tr>
                <th className="p-4 text-left text-sm font-semibold text-black">Name & Academy</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Sport</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Location</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Time & Date</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Joined</th>
                <th className="p-4 text-left text-sm font-semibold text-black">status</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
            </tr>
            </thead>

            <tbody className="whitespace-nowrap">
                {
                    trialList.results.map((trial,index)=>(
                        <tr className="odd:bg-blue-50" key={index}>
                            <td className="p-4 text-sm">
                            <div className="flex items-center cursor-pointer w-max" onClick={()=>navigate(`/academy/trial_details/${trial.id}`)}>
                                <img src={trial.image || 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} 
                                        className="w-9 h-9 rounded-full shrink-0"  alt={trial.name} />
                                <div className="ml-4">
                                <p className="text-sm text-black">{trial.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{trial.academy_details.username}</p>
                                </div>
                            </div>
                            </td>
                            <td className="p-4 text-sm text-black">
                                {trial.sport}
                            </td>
                            <td className="p-4 text-sm text-black">
                                {trial.state} <br />{trial.district}
                            </td>
                            <td className="p-4 text-sm text-black">
                                {convertTo12HourFormat(trial.trial_time)} <br /> {new Date(trial.trial_date).toDateString()} 
                            </td>
                            <td className="p-4 text-sm text-black text-center">
                                {trial.player_count}
                            </td>
                            <td className={`p-4 ${!trial.is_active ? 'text-red-500' : new Date(trial.trial_date) > currentDate ? 'text-amber-400' : 'text-green-500' }  `}>
                                {!trial.is_active ? "Cancelled" : new Date(trial.trial_date) > currentDate ? "Up Coming" : "Completed" }
                            </td>
                            <td className="p-4">
                            <button className="mr-4" title="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                                viewBox="0 0 348.882 348.882">
                                <path
                                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                    data-original="#000000" />
                                <path
                                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                    data-original="#000000" />
                                </svg>
                            </button>
                            <button title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                <path
                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                    data-original="#000000" />
                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                    data-original="#000000" />
                                </svg>
                            </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <div className="pagination-controls mt-4 flex items-center justify-between">
          <button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
          <div>
            <label htmlFor="pageSize" className="mr-2">Page Size:</label>
            <select 
              id="pageSize" 
              value={pageSize} 
              onChange={handlePageSizeChange} 
              className="px-4 py-2 bg-white text-black rounded border border-gray-300"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={trialList.count}>Show all {trialList?.count} </option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrialManage

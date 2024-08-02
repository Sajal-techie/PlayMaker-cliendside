import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTrialAcademy } from '../../Custom Hooks/useTrialAcademy'
import { Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'

const TrialSection = ({ownProfile,id}) => {
    const {data:trialList, isLoading,isError} = useTrialAcademy(1,10,null,null,null,null,id=id)
    const role = useSelector(state=>state.auth.role)
    console.log(id,role,ownProfile)
    const navigate = useNavigate()
    
    if (isLoading) return <Skeleton />
    if (isError) return role === 'academy' ? <Navigate to={'/academy/home'} />: <Navigate to={'/home'} />

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 font-kanit">
        <div className='flex justify-between items-center w-full p-8 pb-0'>
            <h4 className="text-xl text-gray-900 font-bold">{ownProfile ? <>Trials</> : <>Latest Trials</> } </h4>
            {
                ownProfile &&
                    <div className={`flex px-2 py-1 `}>
                        <Link to={'/academy/add_trial'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-4 cursor-pointer hover:text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link>
                        <Link to={'/academy/list_trials'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer hover:text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </Link>
                    </div>
            }
        </div> 

        <div className="mt-2 text-gray-700  ">
            { trialList.length >0 ?  
                <div>
                    {trialList.slice(0,3).map((obj,index)=>(
                        <div key={index} className='flex mb-5 capitalize px-8'>
                            <img className={`w-20 border border-gray-300 ${role==='player' && 'cursor-pointer'}`} src={obj?.image ? obj?.image : 
                                            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="trial image" onClick={()=>( role === 'player' && navigate(`/trial_details/${obj.id}`))}  />
                            <div className='ml-2 flex flex-col text-sm justify-center'>
                                <div>
                                    {obj?.name}
                                </div>
                                <div className=''>
                                    {obj?.venue}, {obj?.district}, {obj?.state}
                                </div>
                                <p className=''>
                                    {new Date(obj?.trial_date).toDateString()} {obj?.issued_year}
                                </p>
                            </div> 
                        </div>
                    ))}
                    {
                        (trialList.length > 3 && ownProfile) && 
                        <Link to={'/academy/list_trials'}>
                            <div className='flex justify-center border py-2 font-medium cursor-pointer hover:font-semibold hover:bg-gray-100'>
                                <div className='flex items-center'>
                                    Show All trials
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1 ml-1 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    }   
                </div>  
                    : 
                    <>
                    {
                        ownProfile &&
                        <p className="mt-2 text-gray-700 text-center pb-5">
                        <Link to={'/academy/add_trial'} className='border border-indigo-700 px-2 py-1 rounded-full mt-4' > new trial </Link>  
                        </p>
                    }
                    </>
                }
        </div>
    </div>
  )
}

export default TrialSection

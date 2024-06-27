import React, { Suspense, useEffect, useState } from 'react'
import userApi from '../../../../api/axiosconfig'
import { Link } from 'react-router-dom'

const Achievementsection = ({academy,dob}) => {
    const AchievementModal = React.lazy(()=>import('./AchievementModal')) 

    const [achievements,setAchievements] = useState([])
    const [isOpen,setIsOpen] = useState(false)
    const bgColor = academy ? "bg-indigo-400":"bg-gblue-400" 
    const textColor = academy ? "text-indigo-500": "text-gblue-500" 
    const borderColor = academy ? "border-indigo-600" : "border-gblue-700"

    useEffect(()=>{
        getAchievements()
    },[])

    const showAchievementModal = ()=>{
        setIsOpen(true)
    }
    const closeAchievementModal = ()=>{
        setIsOpen(false)
    }
    const getAchievements = async ()=>{
        try{
            const res = await userApi.get('user_achievement')
            console.log(res,'achievement fetching success');
            if (res.status===200){
                setAchievements(res.data)
            }
        }catch(error){
            console.log(error,'achievement fetching error');
        }
    }
    console.log(achievements,'achievements');
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4  font-kanit">
        <div className='flex justify-between items-center w-full p-8 pb-0'>
            <h4 className="text-xl text-gray-900 font-bold">Achievements  </h4>
            <div className={`flex px-2 py-1 `}>
                <svg onClick={showAchievementModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-4 cursor-pointer hover:text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <Link to={'/view_achievements'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer hover:text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </Link>
            </div>
        </div>

        <div className="mt-2 text-gray-700  ">
        { achievements.length >0 ?  
                <div>
                    {achievements.slice(0,3).map((obj,index)=>(
                        <div key={index} className='flex mb-5 capitalize px-8'>
                            <img className='w-20' src={obj?.image ? obj?.image : 
                                                            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="achievement image"/>
                            <div className='ml-2 flex flex-col text-sm justify-center'>
                                <div>
                                    {obj?.title}
                                </div>
                                <div className=''>
                                    {obj?.issued_by}
                                </div>
                                <p className=''>
                                    {obj?.issued_month} {obj?.issued_year}
                                </p>
                            </div> 
                        </div>
                    ))}
                    {
                        achievements.length > 3 && 
                        <Link to={'/view_achievements'}>
                            <div className='flex justify-center border py-2 font-medium cursor-pointer hover:font-semibold hover:bg-gray-100'>
                                <div className='flex items-center'>
                                    Show All {achievements.length} Played academies  
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1 ml-1 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>

                                </div>
                            </div>
                        </Link>
                    }   
                </div>  
                    : 
                <div className='text-center pb-5'>
                    <button onClick={showAchievementModal} className={`${borderColor} border px-2 py-1 rounded-full mt-4`}> add achievements </button>  
                </div>
                }
        </div>

            <Suspense fallback={<div>loading</div>}>
                {isOpen &&  <AchievementModal isOpen={isOpen} closeAchievementModal={closeAchievementModal} getAchievements={getAchievements} dob={dob}/>}
            </Suspense>
    </div>
  )
}

export default Achievementsection

import React, { useEffect, useState,Suspense } from 'react'
import { Link } from 'react-router-dom'
import userApi from '../../../../api/axiosconfig'
const ExperienceModal = React.lazy(()=>import('./ExperienceModal'))

const ExperienceSection = React.memo(({dob}) => {
    const [isOpen,setIsOpen] = useState(false)
    const [userAcademies,setUserAcademies] = useState([])

    const showExperienceModal = ()=>{
        setIsOpen(true)
    }
    const closeUpdateModal = ()=>{
        setIsOpen(false)
    }
    useEffect (()=>{
        getUserAcademies()
    },[])
    const getUserAcademies = async ()=>{
        try{
            const res = await userApi.get('user_academy')
            console.log(res,'user academies');
            if (res.status===200){
                setUserAcademies(res.data)
            }
        } catch(error){
            console.log(error,'error');
        }
    }
    console.log(userAcademies);
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 font-kanit">
        <div className='flex justify-between items-center w-full p-8 pb-0'>
            <h4 className="text-xl text-gray-900 font-bold">Academies</h4>
            <div className='flex'>
            <svg onClick={showExperienceModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-4 cursor-pointer hover:text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <Link to={'/view_experience'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer hover:text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </Link>
            </div>

        </div>
            <div className="mt-2 text-gray-700">
                { userAcademies.length >0 ?  
                    <div>
                        {userAcademies.slice(0,3).map((obj,index)=>(
                            <div key={index} className='flex mb-5 capitalize px-8'>
                                <img className='w-20 border border-gray-300' src={obj?.academy_details?.profile?.profile_photo ? obj?.academy_details?.profile?.profile_photo : 
                                                                'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="hai"/>
                               <div className='ml-2 flex flex-col text-sm'>
                                    <div>
                                        {obj?.sport}
                                    </div>
                                    <div className=''>
                                        {obj?.position} - {obj?.academy_details?.username}
                                    </div>
                                    <p className=''>
                                        {obj?.start_month} {obj?.start_year} - {obj?.is_current ?<>present</>  : <>{obj?.end_month} {obj?.end_year}</> } 
                                    </p>
                                </div> 
                            </div>
                        ))}
                        {
                            userAcademies.length > 3 &&
                            <Link to={'/view_experience'}>
                                <div className='flex justify-center border py-2 font-medium cursor-pointer hover:font-semibold hover:bg-gray-100'>
                                    <div className='flex items-center'>
                                        Show All {userAcademies.length} Played academies  
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
                        <button className="border border-gblue-400 hover:bg-gblue-500 hover:text-white px-2 py-1 rounded-full mt-4" onClick={showExperienceModal}>
                            Add Academy 
                        </button>  
                    </div>
                }
                
            </div>
        <Suspense fallback={<div>loading</div>}>
          {isOpen && <ExperienceModal isOpen={isOpen} closeUpdateModal={closeUpdateModal} dob={dob} getUserAcademies={getUserAcademies} />}
        </Suspense>
    </div>
  )
})

export default ExperienceSection

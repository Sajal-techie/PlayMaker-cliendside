import React, { useEffect, useState,Suspense } from 'react'
import Navbar from '../../navbar/Navbar'
import { Link } from 'react-router-dom'
import userApi from '../../../../api/axiosconfig'

const ViewExperience = () => {
  const ExperienceModal = React.lazy(()=>import('./ExperienceModal') ) 

  const [isOpen,setIsOpen] = useState(false)
  const [userAcademies,setUserAcademies] = useState([])
  const [curAcademy,setCurAcademy] = useState({})

  const closeUpdateModal = ()=>{
    setIsOpen(false)
    setCurAcademy({})
  }
  const showExperienceModal = ()=>{
    setIsOpen(true)
  }
  const OpenUpdateModal = (academy)=>{
    setCurAcademy(academy)
    showExperienceModal()
  }
  useEffect(()=>{
      getUserAcademies()
  },[])
  //  to get all academies played by user
  const getUserAcademies = async ()=>{
      try{
            const res = await userApi.get('user_academy')
            console.log(res,'user academies');
            if (res.status===200){ 
                setUserAcademies(res.data)
            }
        } catch(error) {
            console.log(error,'error');
        }
    }
    console.log(userAcademies,curAcademy);
  return (
    <>
      <Navbar />
      <div className='h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12 capitalize font-kanit'>
        <div className='bg-white rounded-lg shadow-2xl pb-2'>
          <div className='flex justify-between items-center w-full p-8 pb-0'>
              <div className='flex items-center'>
                <Link to={'/profile'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:bg-gray-300 hover:rounded-full ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                  </svg>
                </Link>
                <h4 className="text-xl text-gray-900 font-bold ml-10">Academies</h4>
              </div>
              <div className='flex'>
                <svg onClick={showExperienceModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
          </div>

          <div>
            {userAcademies &&
            <div>
              {userAcademies.map((obj,index)=>(
                <div key={index} className='flex justify-between my-8 px-16'>
                  <div className='flex  text-gray-900'>
                    <img className='w-20' src={obj?.academy_details?.profile?.profile_photo ? obj?.academy_details?.profile?.profile_photo : 
                                    'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="" 
                                    />
                    <div className='ml-2 flex flex-col text-sm'>
                      <div>
                          {obj?.sport}
                      </div>
                      <div>
                          {obj?.position} - {obj?.academy_details?.username ?<>{obj?.academy_details?.username }</>: <> unknown </> } 
                      </div>
                      <div>
                        {obj?.start_month} {obj?.start_year} - {obj?.is_current ?<>present</>  : <>{obj?.end_month} {obj?.end_year}</> } 
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg onClick={()=>OpenUpdateModal(obj)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer hover:text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            }
          </div>
        </div>
      </div>
      <Suspense fallback={<div>loading</div>} >
        { isOpen && <ExperienceModal  isOpen={isOpen} closeUpdateModal={closeUpdateModal} getUserAcademies={getUserAcademies} initialState={curAcademy} />}
      </Suspense>
    </>
  )
}

export default ViewExperience

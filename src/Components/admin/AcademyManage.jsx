import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { baseUrl } from '../../api/api'

const AcademyManage = () => {
    const [academy,setAcademy] = useState([])
    const [license,setLicense] = useState([])

    useEffect(()=>{
        fetchAcademies()
    },[]) 

    // to fetch all the academies from backend
    const fetchAcademies = async ()=>{
        try{
            const response = await userApi.get('list_academy')
            console.log(response);
            if (response.data && response.data.status===200){
                setAcademy(response.data.academy)
            }
            else if (response.data && response.data.status===204){
                    setAcademy([])
            }
        }catch(error){
            console.log(error);
        }
    }

    // to display the image of license as modal
    const viewLicense = (image,name)=>{
        document.getElementById('my_modal_3').showModal(), 
        setLicense([`${baseUrl}${image}`,name]) 
    }

    //  to chagne certification status
    const handleCertication = async(data,id)=>{
        console.log(data,id,'hey');
        try{
            const response = await userApi.post(`update_certified/${id}`,{value:data})
            fetchAcademies()
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }
    console.log(academy);
  return ( 
    <>
     <section className="container mx-auto p-6 font-kanit">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 capitalize border-b border-gray-600">
                    <th className="px-4 py-3"onClick={fetchAcademies} >id</th>
                    <th className="px-4 py-3">name</th>
                    <th className="px-4 py-3">email</th>
                    <th className="px-4 py-3">established</th>
                    {/* <th className="px-4 py-3">sport</th> */}
                    <th className="px-4 py-3">state <br />district</th>
                    <th className="px-4 py-3">license</th>
                    <th className="px-4 py-3">Certified</th>
                </tr>
                </thead>
        {
            academy.length > 0 ?
               ( academy.map((obj)=>(
             <tbody className="bg-white capitalize ">
             <tr className="text-gray-700">
                 <td className="px-4 py-3 text-ms font-semibold border">{obj.id}</td>
                 <td className="px-4 py-3 border">
                 <div className="flex items-center text-sm">
                     <div className="relative w-10 h-10 mr-3 rounded-full md:block">
                     <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                     <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                     </div>
                     <div>
                     <p className="font-semibold text-black">{obj.username}</p>
                     <p className="text-xs text-gray-600">{obj.sport.sport_name} Academy </p>
                     </div>
                 </div>
                 </td>
                 {/* <td className="px-4 py-3 text-xs border">
                 <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
                 </td> */}
                 <td className="px-4 py-3 text-sm border normal-case">{obj.email}</td>
                 <td className="px-4 py-3 text-sm border">{obj.dob}</td>  
                 {/* <td className="px-4 py-3 text-sm border">{obj.sport.sport_name}</td> */}
                 <td className="px-4 py-3 text-sm border">{obj.profile.state} <br /> {obj.profile.district}</td>
                 <td className="px-4 py-3 border">
                 <div className="flex items-center text-sm">
                     <div className="relative w-14  h-10 mr-3 md:block">
                     <img className="object-cover w-full h-full rounded-md cursor-pointer "   onClick={()=>viewLicense(obj.academy_data.license, obj.username)}
                        src={`${baseUrl}${obj.academy_data.license}`} alt="license" loading="lazy" title='view license' />
                     {/* <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div> */}
                     </div>
                     <div>
                     <p className="font-semibold text-green-500"onClick={()=>handleCertication('approve',obj.id)} > {obj.academy_data.is_certified  ? <span>Approved</span>  :<span>Approve</span> }  </p>
                     <p className="font-semibold text-red-500" onClick={()=>handleCertication('deny',obj.id)} >  {!obj.academy_data.is_certified ?<span>Denied</span>  :<span>Deny</span> } </p>
                     </div>
                 </div>
                 </td>
                 <td className="px-4 py-3 text-sm border">{obj.academy_data.is_certified===true ?<span>Yes</span>:<span>No</span> }</td>
             </tr>
             </tbody>))) : <div>no data</div>}
                
            </table>
            </div>
        </div>
    </section> 

        {/* modal for showing license */}
        <dialog id="my_modal_3" className="modal p-5">
            <div className="modal-box">
                <form method="dialog" className="modal-backdrop">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setLicense([])}
                >
                    ✕
                </button>
                </form>
                <h3 className="font-bold text-lg text-center capitalize">{license[1]} license</h3>
                <div className='flex text-center justify-center'>
                    <img className='max-w-[500px]' src={license[0]} alt="License" />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop text-center mt-2">
                <button
                    className="bg-red-500 px-4 py-1 rounded-lg text-white"
                    onClick={() => setLicense([])}
                >
                    close 
                </button>
                </form>
            </dialog>
    </>
  )
}

export default AcademyManage

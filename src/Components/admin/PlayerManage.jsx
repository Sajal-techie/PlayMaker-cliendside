import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'

const PlayerManage = () => {
    const [player,setPlayer] = useState([])
    const fetchPlayers = async()=>{
        try{
            const response = await userApi.get('list_players')
            console.log(response);
            if (response.data && response.data.status===200){
                setPlayer(response.data.player)
            }
            else if (response.data && response.data.status===204){
                setPlayer([])
            }
        }catch (error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchPlayers()
    },[])

    const handleActive = async (data,id)=>{
        try{
            const res = await userApi.post(`toggleIsactive/${id}`,{value:data})
            fetchPlayers()
            console.log(res);
        }catch (error){
            console.log(error);
        }
    }
  return (
    <>

     <section className="container mx-auto p-6 font-kanit">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 capitalize border-b border-gray-600">
                    <th className="px-4 py-3">id</th>
                    <th className="px-4 py-3">name</th>
                    <th className="px-4 py-3">email</th>
                    <th className="px-4 py-3">DOB</th>
                    {/* <th className="px-4 py-3">sport</th> */}
                    <th className="px-4 py-3">state <br />district</th>
                    <th className="px-4 py-3">active</th>
                    {/* <th className="px-4 py-3">Certified</th> */}
                </tr>
                </thead>
        {
            player.length > 0 ?
               ( player.map((obj,index)=>(
             <tbody className="bg-white capitalize " key={index}>
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
                     <div>
                        {/* {
                            obj.is_active ? 
                                        <p className="font-semibold text-green-500">Acitve</p>
                                        :
                                        <p className="font-semibold text-red-500"> Blocked </p>
                        } */}
                         {
                            obj.is_active ? 
                                        <p className="font-semibold text-red-500" onClick={()=>handleActive('block',obj.id)}>Block</p>
                                        :
                                        <p className="font-semibold text-green-500" onClick={()=>handleActive('active',obj.id)}>Active</p>
                        }
                     </div>
                 </div>
                 </td>
                 {/* <td className="px-4 py-3 text-sm border">{obj.academy_data.is_certified===true ?<span>Yes</span>:<span>No</span> }</td> */}
             </tr>
             </tbody>))) : <div>no data</div> }
                
            </table>
            </div>
        </div>
    </section> 

        {/* modal for showing license */}
        {/* <dialog id="my_modal_3" className="modal p-5">
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
            </dialog> */}
    </>
  )
}

export default PlayerManage

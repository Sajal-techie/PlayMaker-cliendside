import React, { useCallback, useState } from 'react'
import ReactModal from 'react-modal'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userApi from '../../../../api/axiosconfig'

const UpdateAboutModal = ({isOpen,closeUpdateModal,about,fetchapi}) => {
  const [data,setData] = useState(about?about:null)
  
  const updateAbout = async (e)=>{
    e.preventDefault()
    console.log(data);
    try{
      const res = await userApi.put('update_about',{about:data})
      console.log(res);
      showToastMessage(res.status,"  About updated success")
    } catch (err){
      console.log(err);
      showToastMessage({status:500,message:err?.code==='ERR_NETWORK'?"Internal Server Error":"Bad Gateway"})
    } 
    fetchapi()
    closeUpdateModal()
  }
  const showToastMessage = (status, message) => {
    console.log(status, message);
    const options = {
        position: 'bottom-right',
        draggable: true,
    }
    if (status===200){
        toast.success(message, options);
    }
    else{
        toast.error(message,options)
    }
  };
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '900px',
            width: '90%',
            inset: 'auto',
            //  borderRadius: '8px',
            overflow: 'auto',
            padding: '20px',
            border: 'none',
            // top: '50%',
            // transform: 'translateY(-50%)',
            backgroundColor: '#fff',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow:'auto'
          },
        }}
      >
          <div className="items-center mb-5 w-full font-kanit">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
              onClick={closeUpdateModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center capitalize">Update About </h3>
            <form className='flex flex-col items-center' onSubmit={updateAbout}>
              <textarea defaultValue={about}  id='about' rows={10} className='border border-black my-3 px-1 w-11/12' onChange={(e)=>setData(e.target.value)} >
                   
              </textarea>
              <button className='bg-gblue-500 rounded-2xl py-1 px-5 text-white absolute bottom-4 right-12'>save</button>
            </form>
          </div>
      </ReactModal>
    </div>
  )
}

export default UpdateAboutModal

import React, { useState } from 'react'
import userApi from '../../../api/axiosconfig'
import Modal from 'react-modal'
const ImgModal = ({state,is_pic,id,fetchapi}) => {
    const [image,setImage] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const updatePhoto = async (id)=>{
        const formData = new FormData()
        formData.append('profile_photo',image)
        try{
            const res = await userApi.post('update_photo/'+id, formData)
            console.log(res);
            // document.getElementById('my_modal_4').close()
        }catch (error){
            console.log(error,'errror in update profile');
        }
        fetchapi()
        closeModal()
        document.getElementById('my_modal_3').close()
    }
    const closeModal = ()=>{
        setModalIsOpen(false)
        setImage('')
    }
    const uploadProfilePhoto = ()=>{
        setModalIsOpen(true)
        // document.getElementById('my_modal_4').showModal() 
    }
    const deletePhoto = async ()=>{
        try{
            const res = await userApi.delete('delete_photo/'+id)
            console.log(res,'response delete');
        }catch(error){
            console.log(error, 'error delete');
        }
        fetchapi()
        closeModal()
        document.getElementById('my_modal_3').close()
    }
    console.log(image, 'haisdha');
  return (
    <>
    {/* update photo modal */}
        <dialog id="my_modal_3" className="modal p-6 font-kanit border border-gray-400">
        <div className="modal-box">
            <form method="dialog" className="modal-backdrop">
            <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                // onClick={() => setProfile([])}
            >
                ✕ 
            </button>
            </form>
            <h3 className="font-bold text-lg text-center capitalize">{state[1]} profile photo</h3>
            <div className='flex text-center justify-center bg-gray-200 px-7'>
                <img style={{ borderRadius: '50%' }} className='min-w-80 min-h-80 max-h-80 max-w-80 object-cover' src={state[0]} alt="image" />
            </div>
        </div>
            <div className="mt-2 flex justify-between">
                <button className="bg-gblue-500 w-full py-1 text-white" onClick={()=>uploadProfilePhoto(id)} >  
                    update photo  
                </button>
                {   is_pic &&
                    <button className='bg-red-500 w-full py-1 text-white' onClick={deletePhoto}>  
                        delete photo
                    </button>
                }
            </div>
        </dialog>


        {/* upload photo modal */}
        
        <Modal 
            isOpen={modalIsOpen} 
            onRequestClose={() => closeModal()} 
            parentSelector={() => document.querySelector('#my_modal_3')} 
            ariaHideApp={false}
            className=' min-w-[500px]  max-w-[500px] shadow-md font-kanit border border-gray-900 bg-white'
            style={{
                content: {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  maxWidth: '90%',
                  maxHeight: '90vh', 
                  textAlign: 'center'
                //   width: 'auto', 
                //   height: 'auto', 
                },
              }}>
            <div className='flex justify-center'>
            <div id="" className="flex flex-col justify-between  min-h-96 max-w-96 p-3">
                <div className="">
                    <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => closeModal() }
                    >
                    ✕
                    </button>
                <h3 className="font-bold text-lg text-center capitalize">{state[1]} Choose photo</h3>
                <div className='flex text-center justify-center bg-gray-200 px-10'>
                    {image ? <img style={{ borderRadius: '50%' }} className='min-w-80 min-h-80 max-w-80 max-h-80 object-cover  mx-auto' src={URL.createObjectURL(image)} alt="photo" />
                    :
                    <label htmlFor="pic"><div className='m-20 '>  help others recognize  you</div></label>   
                    }
                </div>
                <div className=''>

                   
                </div>
                <input hidden id='pic' type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="mt-2 mb-2 ">
                { image ?  <button className="bg-gblue-500 w-full py-1 mb-2 text-white" onClick={() => updatePhoto(id)}>
                    save
                </button> :  <label className='bg-gblue-500 w-full py-1 px-4  text-white' htmlFor="pic">upload photo</label>}
                    
                {/* {is_pic && <button className='bg-red-500 w-full py-1 text-white'>delete photo</button>} */}
                </div>
            </div></div>
            </Modal>
            </>
  )
}

export default ImgModal

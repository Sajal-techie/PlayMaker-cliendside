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
    }
    const deletePhoto = async ()=>{
        try{
            const res = await userApi.delete('delete_photo/'+id, { data: {'type':'profile'}})
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
    {/*  modal to show the existing image*/}
        <dialog id="my_modal_3" className="modal p-6 font-kanit border border-gray-400">
        <div className="modal-box">
            <form method="dialog" className="modal-backdrop">
            <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
            >
                ✕ 
            </button>
            </form>
            <h3 className="font-bold text-lg text-center capitalize"> profile photo</h3>
            <div className='flex text-center justify-center bg-gray-200 px-7'>
                <img style={{ borderRadius: '50%' }} className='min-w-80 min-h-80 max-h-80 max-w-80 object-cover'
                     src={state?state:"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"  } alt="image" />
            </div>
        </div>
            <div className="mt-2 flex justify-between">
                <button className="bg-gblue-500 hover:bg-gblue-800 w-full py-1 text-white" onClick={()=>uploadProfilePhoto(id)} >  
                    update photo  
                </button>
                {   state &&
                    <button className='bg-red-500 w-full py-1 text-white' onClick={deletePhoto}>  
                        delete photo
                    </button>
                }
            </div>
        </dialog>


        {/* upload photo modal to add new image*/}
        
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
                overlay:{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
              }}>
            <div className='flex justify-center'>
                <div id="" className="flex flex-col justify-between  min-h-96 max-w-96 p-3">
                    <div className="">
                        <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
                        onClick={() => closeModal() }
                        >
                        ✕
                        </button>
                    <h3 className="font-bold text-lg text-center capitalize">Choose photo</h3>
                    <div className='flex text-center justify-center bg-gray-200 px-10'>
                        {image ? <img style={{ borderRadius: '50%' }} className='min-w-80 min-h-80 max-w-80 max-h-80 object-cover  mx-auto' src={URL.createObjectURL(image)} alt="photo" />
                        :
                        <label htmlFor="pic"><div className='m-20 '>  help others recognize  you</div></label>   
                        }
                    </div>
                    <input hidden id='pic' type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="mt-2 mb-2 ">
                    { image ?  
                        <button className="bg-gblue-500 hover:bg-gblue-800 w-full py-1 mb-2 text-white" onClick={() => updatePhoto(id)}>
                            save
                        </button> 
                        :  
                        <label className='bg-blue-700 border border-blue-500 hover:bg-white w-full py-1 px-4  text-white hover:text-blue-500 cursor-pointer' htmlFor="pic">
                            upload photo
                        </label>
                    }
                    </div>
                </div>
            </div>
        </Modal>
    </>
)
}

export default ImgModal

import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDeletePhoto, useUpdatePhoto } from '../../../common/Custom Hooks/useProfile';

const ImgModal = ({state,is_pic,id,bgColor,textColor,ownProfile}) => {
    const [image,setImage] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const updateProfilePhoto = useUpdatePhoto()
    const deletePhoto = useDeletePhoto()

    // to send profile photo to server
    const updatePhoto = async (id)=>{
        const formData = new FormData()
        formData.append('profile_photo',image)
        
       
        updateProfilePhoto.mutate({id,formData}) // to update profile using custom hook and react query 
        closeModal()
        document.getElementById('my_modal_3').close()
    }

    //  to close the modal and clear states 
    const closeModal = ()=>{
        setModalIsOpen(false)
        setImage('')
    }
    // to open the upload modal
    const uploadProfilePhoto = ()=>{
        setModalIsOpen(true)
    }
    // to delete the profile photo from server
    const deleteProfilePhoto = async ()=>{
        const type = {'type':'profile'}
        deletePhoto.mutate({id,type}) // to delete profile photo using custom hook and react query
        closeModal()
        document.getElementById('my_modal_3').close()
    }

  return (
    <>
    {/*  modal to show the existing image*/}
        <dialog id="my_modal_3" className="modal p-6 font-kanit border border-gray-400 mt-20">
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
        {
            ownProfile &&
            <div className="mt-2 flex justify-between">
                {   state &&
                    <button className='border border-red-500 hover:border-red-900 w-full py-1 hover:bg-red-300 text-red-500 hover:text-red-900' onClick={deleteProfilePhoto}>  
                        Delete photo
                    </button>
                }
                <button className={`${bgColor} w-full py-1 text-white`} onClick={()=>uploadProfilePhoto(id)} >  
                    update photo  
                </button>
            </div>
        }
        </dialog>


        {/* upload photo modal to add new image*/}
        
        <Modal 
            isOpen={modalIsOpen} 
            onRequestClose={closeModal} 
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
                  textAlign: 'center',
                  overflow:'auto'
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
                        <button className={`${bgColor} w-full py-1 mb-2 text-white`} onClick={() => updatePhoto(id)}>
                            save
                        </button> 
                        :  
                        <label className='bg-blue-700 border border-blue-500 hover:bg-white w-full py-1 px-5  text-white hover:text-blue-500 cursor-pointer' htmlFor="pic">
                            upload 
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

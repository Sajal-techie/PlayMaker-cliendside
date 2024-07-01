import React from 'react'
import ReactModal from 'react-modal'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userApi from '../../../api/axiosconfig';

const ChangeStatusModal = ({isOpen,closeModal,current,fetchAcademies}) => {
    const handleCertication = async (data, id) => {
        try {
            const response = await userApi.post(`update_certified/${id}`, { value: data });
            console.log(response);
            showToastMessage(response.data)
        } catch (error) {
            console.log(error);
        }
        fetchAcademies();
        closeModal();
    }

    const showToastMessage = ({ status, message }) => {
        console.log(status, message);
        const options = {
            position: 'bottom-right',
            draggable: true,
        }
        if (status===200){
            toast.success(message, options);
            console.log('success');
        }
        else{
            toast.error(message,options)
            console.log('toast error');
        }
        };
  return (
    <ReactModal isOpen={isOpen}
    onRequestClose={closeModal}
    ariaHideApp={false}
    style={{
      content: {
        position: 'relative',
        margin: 'auto',
        maxWidth: '500px',
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
    <button
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
      onClick={closeModal}
    >
      ✕
    </button>
        <div className='text-center font-extrabold text-2xl'>
            Change Status
        </div>
        <div className='text-center mt-4 '>Academy Name : <span className='font-semibold'>{current?.username}</span> </div>
        <div className='text-center mb-1'>current status : <b> {current?.academy_data?.is_certified ?<>Approved</>:<>Denied</>}</b></div>
        <div className='text-center w-full'>
            {
                current?.academy_data?.is_certified ?
                <button className='bg-red-500 py-2 w-1/3 text-white hover:bg-red-800' onClick={() => handleCertication('deny', current?.id)}>Deny</button>
                :
                <button className='bg-green-500 py-2 w-1/3 hover:bg-green-700 text-white' onClick={() => handleCertication('approve', current?.id)}>Approve</button>
            }
        </div>
        
    </ReactModal>
  )
}

export default ChangeStatusModal

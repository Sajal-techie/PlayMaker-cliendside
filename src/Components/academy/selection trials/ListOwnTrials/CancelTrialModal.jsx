import { useState } from 'react'
import ReactModal from 'react-modal'

const CancelTrialModal = ({isOpen,closeModal,current,handleCancel}) => {
    const [reason,setReason] = useState('') // for storing cancellation reason

  return (
    <ReactModal 
    isOpen={isOpen}
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
        Cancel Trial
    </div>
    {/* <div className='text-center mt-4 '>Academy Name : <span className='font-semibold'>{current?.username}</span> </div> */}
    <div className='text-center mb-3'> <b></b></div>
    <div className='text-center w-full font-kanit'>
        {/* {
            current?.academy_data?.is_certified ?
            <button className='bg-red-500 py-2 w-1/3 text-white hover:bg-red-800' onClick={() => handleCertication('deny', current?.id)}>Deny</button>
            :
            <button className='bg-green-500 py-2 w-1/3 hover:bg-green-700 text-white' onClick={() => handleCertication('approve', current?.id)}>Approve</button> 
        } */}
        Are you sure you want to cancel <b>{current.name}</b>   <br />
        <form  onSubmit={()=>{handleCancel(reason)}}>
            <textarea onChange={(e)=>setReason(e.target.value)} name="reason" id="reason" placeholder='Reason for cancellation' value={reason} className='border-2 border-gray-500 p-1' rows={3} cols={32} required></textarea> <br />
            <button type='submit' className='border border-red-500 py-2 w-1/3 text-red-500 hover:bg-red-100 mt-3'>Yes, cancel trial</button>
            <button type='button' className='border border-green-500 py-2 w-1/3 hover:bg-green-100 bg-green-200 text-green-800' onClick={()=>{closeModal(); setReason('')}}>No</button> 
        </form>
    </div>
    </ReactModal>
  )
}

export default CancelTrialModal

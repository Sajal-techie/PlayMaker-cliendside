import { Button } from '@mui/material'
import React from 'react'
import ReactModal from 'react-modal'
import userApi from '../../../api/axiosconfig'
import { showToastMessage } from '../../common/functions/showToastMessage'

const CancelModal = ({isOpen, closeModal,playerId,cancellationSucess }) => {

    
  const handleRemoveRegistraiton = async ()=>{

    console.log(playerId,'player id');
    
    try{
      const responce = await userApi.delete(`player_trial/${playerId}`)
      console.log(responce);
      showToastMessage(200, 'cancelled trial registraion ')
      cancellationSucess()
    }catch(error){
      console.log('failed to cancel trial');
    }

    closeModal()
  }
  return (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
            content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '400px',
            width: '70%',
            inset: 'auto',
            overflow: 'auto',
            padding: '20px',
            border: 'none',
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
        <div className='font-kanit'>
            <div className='text-center mb-5'>
                Are you sure you want to cancel Registration
            </div>
            <div className='text-center'>
                <Button color='success' variant='outlined' sx={{marginRight:3}} onClick={handleRemoveRegistraiton}>
                    Yes, Cancel
                </Button>
                <Button variant='contained' color='error'onClick={closeModal}>
                    No
                </Button>
            </div>
        </div>
    </ReactModal>
  )
}

export default CancelModal

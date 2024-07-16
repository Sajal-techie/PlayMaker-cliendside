import React from 'react'
import ReactModal from 'react-modal'
import {Button} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import { logout } from '../../../redux/slices/authSlice'

const LogoutModal = ({isOpen,closeModal,academy}) => {
    const queryClient = useQueryClient()
    console.log('3333333333333333333333333333333333333333');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogout = async ()=>{
        try{
          const res = await dispatch(logout()).unwrap()
          console.log(res,'in home');
          queryClient.clear()  // clear the fetched datas by useQuery
          Swal.fire({
            icon: 'success',
            title: 'Logout Successfull',
          })
          if (academy){
            navigate('/academy/login')
          } else {
              navigate('/')
            }
        }catch(error){
          console.log(error,'error in home');
        }
      }
      console.log(isOpen);
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
                Are you sure you want to Logout
            </div>
            <div className='text-center'>
                <Button color='success' variant='outlined' sx={{marginRight:3}} onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 29" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    Logout
                </Button>
                <Button variant='contained' color='error'onClick={closeModal}>
                    Cancel
                </Button>
            </div>
        </div>
    </ReactModal>
  )
}

export default LogoutModal

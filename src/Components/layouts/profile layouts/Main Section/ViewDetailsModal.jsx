import React from 'react'
import ReactModal from 'react-modal'

const ViewDetailsModal = ({isOpen,closeModal,userData}) => {
    console.log(userData);
  return (
    <>
        <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
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
          <div className="items-center mb-5 w-full font-kanit border-2">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center capitalize"> User Details </h3>
              <div className='text-center mt-4'>
                  Name: <span className='font-semibold'>{userData?.user?.username}</span>   
              </div>
              <div className='text-center'>
                email: <span className='font-semibold'>{userData?.user?.email}</span>
              </div>
              <div className='text-center'>
                Number: <span className='font-semibold'>{userData?.user?.phone} </span>
              </div>
              <div className='text-center'>
                Date of Birth: <span className='font-semibold'>{userData?.user?.dob} </span>
              </div>
              <div className='text-center'>
                State: <span className='font-semibold'>{userData?.profile?.state} </span>
              </div>
              <div className='text-center'>
                State: <span className='font-semibold'>{userData?.profile?.district} </span>
              </div>
              <div className='text-center'>
                Sports: <span className='font-semibold'> {userData?.sport.map((obj,index)=> <span key={index} className='capitalize'> {obj.sport_name},</span>  )} </span>
              </div>
              <div className='text-center'>
                Bio: <span className='font-semibold'>{userData?.profile?.bio} </span>
              </div>
              {/* <div className='flex flex-col items-start'>
                <div className='w-full text-start flex'>
                  <div  className='w-1/2 '>

                  </div>
                  <div className='w-1/2'>

                  </div>
                </div>
              </div> */}
          </div>
      </ReactModal>
    </>
  )
}

export default ViewDetailsModal

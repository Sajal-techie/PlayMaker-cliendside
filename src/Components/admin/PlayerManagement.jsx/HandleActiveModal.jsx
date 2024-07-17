import React from 'react'
import ReactModal from 'react-modal'
import userApi from '../../../api/axiosconfig';

const HandleActiveModal = ({isOpen,closeModal,current,fetchPlayers}) => {

    const handleActive = async (data, id) => {
        try {
            await userApi.post(`toggleIsactive/${id}`, { value: data });
        } catch (error) {
            console.log(error);
        }
        fetchPlayers();
        closeModal()
    }
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
        <div className='text-center font-extrabold text-2xl'>
            Change Status
        </div>
        <div className='text-center mt-4 '>Player Name : <span className='font-semibold'>{current?.username}</span> </div>
        <div className='text-center mb-1'>current status : <b> {current?.is_active ?<>Active</>:<>Blocked</>}</b></div>
        <div className='text-center w-full'>
            {
                current?.is_active ?
                <button className='bg-red-500 py-2 w-1/3 text-white hover:bg-red-800' onClick={()=>handleActive('block',current.id)}>Block</button>
                :
                <button className='bg-green-500 py-2 w-1/3 hover:bg-green-700 text-white'onClick={()=>handleActive('active',current.id)}>Activate</button>
            }
        </div>
        
    </ReactModal>
  )
}

export default HandleActiveModal

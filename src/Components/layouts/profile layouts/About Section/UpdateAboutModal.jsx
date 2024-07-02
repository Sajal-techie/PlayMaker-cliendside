import React, { useCallback, useState } from 'react'
import ReactModal from 'react-modal'
import { useUpdateAbout } from '../../../common/Custom Hooks/useProfile';

const UpdateAboutModal = ({isOpen,closeUpdateModal,about}) => {
  const [data,setData] = useState(about?about:null)

  const updateAbout = useUpdateAbout()
  
  const updateAboutData = async (e)=>{
    e.preventDefault()
    
    updateAbout.mutate({about:data}) // using custom hook and react query update about 
    closeUpdateModal()
  }

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeUpdateModal}
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
            <form className='flex flex-col items-center' onSubmit={updateAboutData}>
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

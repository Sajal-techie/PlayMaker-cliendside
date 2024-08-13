import React from 'react'
import ReactModal from 'react-modal'

const ViewDetailsModal = ({ isOpen, closeModal, userData,ownProfile }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      style={{
        content: {
          position: 'relative',
          margin: 'auto',
          marginTop:'70px',
          maxWidth: '500px',
          width: '90%',
          inset: 'auto',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '0',
          border: 'none',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto'
        },
      }}
    >
      <div className="font-sans mb-10">
        <div className="bg-gray-50 py-4 px-6 relative border-b">
          <h3 className="font-semibold text-xl text-gray-800 text-center">User Details</h3>
          <button
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={closeModal}
            title='close'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Name" value={userData?.user?.username} />
            <InfoItem label="Email" value={userData?.user?.email} />
            <InfoItem label="Number" value={userData?.user?.phone} />
            <InfoItem label="Date of Birth" value={userData?.user?.dob} />
            <InfoItem label="State" value={userData?.profile?.state} />
            <InfoItem label="District" value={userData?.profile?.district} />
          </div>
          
          <div className="mt-4">
            <InfoItem 
              label="Sports" 
              value={userData?.sport.map((obj, index) => (
                <span key={index} className="capitalize mr-1">
                  {obj.sport_name}{index < userData.sport.length - 1 ? ',' : ''}
                </span>
              ))}
            />
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Bio</h4>
            <p className="text-gray-900">{userData?.profile?.bio}</p>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

const InfoItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="text-gray-600 text-sm">{label}</span>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
)

export default ViewDetailsModal
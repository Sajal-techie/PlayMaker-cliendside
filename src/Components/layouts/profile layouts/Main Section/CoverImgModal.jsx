import React, { useState, useCallback } from 'react';
import ReactModal from 'react-modal';
import Cropper from 'react-easy-crop';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCroppedImg from './cropImage';
import { useDeletePhoto, useUpdatePhoto } from '../../../common/Custom Hooks/useProfile';

const CoverImgModal = ({ isOpen, changeModalStatus, state, id }) => {
  const [image, setImage] = useState(null); 
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const updateCoverPhoto = useUpdatePhoto()
  const deletePhoto = useDeletePhoto()

  //  to update the croppedAreaPixels in Cropper (triggered when user stops cropping)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // to get cropped verson of the image based on user's selection(croppedAreaPixels)
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      updatePhoto(croppedImage);
      console.log('updated');
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // to send the cropped image to server 
  const updatePhoto = async (croppedImage) => {
    console.log(croppedImage);
    const formData = new FormData();
    formData.append('cover_photo', croppedImage); 

   
    updateCoverPhoto.mutate({id,formData}) // to update cover photo using custom hook and react query
    closeCoverModal()
  };

  // used to display the crop component after selecting a file 
  const handleFileChange =  (e) => {
    if (e.target.files && e.target.files.length > 0){
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader(); // FileReader used to read the contents of the blob file async
        reader.onload = () => {
          setImage(reader.result); // store the selected file in the state and use it for cropping 
        };
        reader.readAsDataURL(file);
      }
    }else{
      console.log('no files ');
    }
  };

  //  to close the cover modal and clear all the states 
  const closeCoverModal  = ()=>{
    setImage(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
    changeModalStatus()
  }

  const deleteCoverImage = async ()=>{
    const type = {'type':'cover'}
    
    deletePhoto.mutate({id,type}) // to delete cover image using custom hook and react query
    closeCoverModal();
  }

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeCoverModal}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '900px',
            width: '90%',
            inset: 'auto',
            borderRadius: '8px',
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
        <div className="flex justify-center font-kanit">
          <div className="flex flex-col justify-between items-center  w-full">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
              onClick={closeCoverModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center capitalize">Choose photo</h3>
            <div className= { image? "relative w-full md:h-80 h-44 " : 'relative w-full p-1'} >
              {/*  if image has data show cropper else show whats inside state */}
              {image ? (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={6 / 2}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  objectFit='horizontal-cover'
                />
              ) :
              state ?
               <div className='flex justify-center w-full'><img src={state} className='w-5/6'  alt=""/></div> 
               :
              <div className='text-center m-5 p-4'>Showcase your personality, interests, team moments or notable milestones</div> 
              }
            </div>
            <input hidden id="pic" type="file" onChange={handleFileChange} />
            {image ? (
              <button
                className="bg-gblue-500 hover:bg-gblue-800 w-full py-2 mb-2 text-white "
                onClick={showCroppedImage}
              >
                Save
              </button>
            ) : (
              <div className='w-5/6 flex justify-center text-center '>
                { state &&
                 <div className="border border-red-500 hover:border-black  hover:text-black w-full  text-red-500 py-2 px-4 cursor-pointer" onClick={deleteCoverImage} >
                  Delete 
                </div>
              }
              <label
                className="bg-gblue-500 hover:bg-gblue-800 w-full py-2 px-4 text-white cursor-pointer"
                htmlFor="pic"
              >
                Upload New Image
              </label>
              
              </div>
            )}
            
            {/* {croppedImage && (
              <button
                className="bg-gblue-500 w-full py-2 mb-2 text-white"
                onClick={updatePhoto}
              >
                Save
              </button>
            )} */}
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default CoverImgModal;

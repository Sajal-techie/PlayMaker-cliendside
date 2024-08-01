import React, { useState } from 'react';
import Modal from 'react-modal';
import userApi from '../../../../api/axiosconfig';

Modal.setAppElement('#root');

const PostModal = ({ isOpen, onClose, fetchPosts, post }) => {
  const [content, setContent] = useState(post?.content ? post.content : '');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [error,setError] = useState(null)

  const handleMediaChange = (e, type) => {
    setError(null)
    const file = e.target.files[0];
    console.log(file,type);
    if (file) {
      setMedia(file);
      setMediaType(type);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaType(null);
  };

  const handleSave = async () => {
    setError(null)
    if (content.trim()==='' && media === null){
      setError('Post cannot be Empty (add media or content)')
      return 
    }
    const formData = new FormData();
    formData.append('content', content);
    if (media) formData.append(mediaType, media);
    try {
      if(post){
        const response = await userApi.patch(`post/${post.id}`,formData)
        console.log(response);
    }else{
        const response = await userApi.post('post', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error, 'error in post');
    }
    
    fetchPosts()
    setContent('');
    setMedia(null);
    setMediaType(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          position: 'relative',
          margin: 'auto',
          marginTop:'80px',
          maxWidth: '600px',
          width: '50%',
          inset: 'auto',
          overflow: 'auto',
          border: 'none',
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl font-kanit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold"> { post ? 'Update post content' : 'Create New Post' } </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <textarea
          className="w-full p-3 mb-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What's on your mind?"
          rows="4"
          value={content}
          onChange={(e) => {setContent(e.target.value),setError(null)}}
        />
        
        {/* is the user selected image or video display that  */}
        {media && (
          <div className="relative mb-4">
            {mediaType === 'image' && (
              <img src={URL.createObjectURL(media)} alt="Selected" className="w-full rounded-lg" />
            )}
            {mediaType === 'video' && (
              <video src={URL.createObjectURL(media)} className="w-full rounded-lg" controls />
            )}
            <button
              onClick={removeMedia}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
          { !media && !post &&
          <>
            <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaChange(e, 'image')}
                disabled={media !== null}
              />
            </label>
            <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Video</span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleMediaChange(e, 'video')}
                disabled={media !== null}
              />
            </label>
          </>
          }
          </div>
          <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          onClick={handleSave}
          >
            {
              post ? 'Update' : 'Post'
            }
            
          </button>
        </div>
          {
            error && <p className='text-red-500 text-center'>{error}</p>
          }
      </div>
    </Modal>
  );
};

export default PostModal;
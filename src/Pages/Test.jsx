import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: 'top-right',
      draggable: true,
    });
  };
  return (
    <div>
       <button onClick={showToastMessage}>Notify</button>
       <ToastContainer />
    </div>
  )
}

export default Test


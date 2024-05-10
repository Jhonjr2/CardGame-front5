import React, { useRef, useEffect, useState } from 'react';
import Login from './Login';
import './style/Modal.css';

const Modal = ({ isOpen, closeModalog }) => {

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
 
  return (
    <>
      {isOpen && (
        <div className="modal_containerLogin" onClick={closeModalog}>
          <div className="modal_contentLogin" onClick={stopPropagation}>
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

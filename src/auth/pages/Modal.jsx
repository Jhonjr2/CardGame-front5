import React, { useRef, useEffect, useState } from 'react';
import './style/Modal.css';

const Modal = ({ isOpen, closeModalog, content }) => {

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
 
  return (
    <>
      {isOpen && (
        <div className="modal_containerLogin" onClick={closeModalog}>
          <div className="modal_contentLogin" onClick={stopPropagation}>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

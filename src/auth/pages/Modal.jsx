import React, { useRef, useEffect, useState } from 'react';
import Login from './Login';
import './style/Modal.css';

const Modal = ({ isOpen, onClose }) => {
  // const modalRef1 = useRef(null);
  const modalRef2 = useRef(null);
  // const modalRef3 = useRef(null);
  // const modalRef4 = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if ( modalRef2.current) {
  //       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //       // const modalTop1 = modalRef1.current.getBoundingClientRect().top;
  //       const modalTop2 = modalRef2.current.getBoundingClientRect().top;
  //       // const modalTop3 = modalRef3.current.getBoundingClientRect().top;
  //       // const modalTop4 = modalRef4.current.getBoundingClientRect().top;
  //       // const deltaY1 = modalTop1 - scrollTop;
  //       const deltaY2 = modalTop2 - scrollTop;
  //       // const deltaY3 = modalTop3 - scrollTop;
  //       // const deltaY4 = modalTop4 - scrollTop;

  //       // Ajusta la inclinación de las cartas según la dirección del scroll
  //       // const rotationAngle1 = deltaY1 < 0 ? 0 : 10;
  //       const rotationAngle2 = deltaY2  < 0 ? -6 : 6;
  //       // const rotationAngle3 = deltaY3 < 0 ? 0 : 10;
  //       // const rotationAngle4 = deltaY4 < 0 ? -6 : -10;

  //       // Aplica la inclinación suavemente a las cartas
  //       // modalRef1.current.style.transform = `translateX(${deltaY1}px) rotate(${rotationAngle1}deg)`;
  //        modalRef2.current.style.transform = `translateX(${deltaY2}px) rotate(${rotationAngle2}deg)`;
  //       // modalRef3.current.style.transform = `translateX(${deltaY3}px) rotate(${rotationAngle3}deg)`;
  //       // modalRef4.current.style.transform = `translateX(${deltaY4}px) rotate(${rotationAngle4}deg)`;
  //     }
  //   };

  //   // Agrega el evento de scroll
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     // Remueve el evento de scroll al desmontar el componente
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

 
  return (
    <>
      {isOpen && (
        <div className="modal_overlay" onClick={onClose}>
          {/* <div className="modal_content" ref={modalRef1}>
            <Login onClose={onClose} />
            <p>1</p>
          </div> */}
          <div className="modal_content2" >
            <Login onClose={onClose} />
            <p>2</p>
          </div>
          {/* <div className="modal_content3" ref={modalRef3}>
            <Login onClose={onClose} />
            <p>3</p>

          </div>
          <div className="modal_content4" ref={modalRef4}>
            <Login onClose={onClose} />
            <p>4</p>

          </div> */}
        </div>
      )}
    </>
  );
};

export default Modal;

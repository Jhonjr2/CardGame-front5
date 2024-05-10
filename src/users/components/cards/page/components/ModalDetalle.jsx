import React, { useRef, useEffect, useState } from 'react';
import img from '../../../../../assets/kid_album.png'
import Modal from '../../../../../auth/pages/Modal';
import '../components/ModalDetalle.css'

const ModalDetalle = ({ isModalOpenDetalle, closeModalDetalle }) => {

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

    const openModal = () => {
        setIsModalOpenLogin(true);
    };
    const closeModal = () => {
        setIsModalOpenLogin(false);
    };

    const handleLoginClick = () => {
        openModal();
    }
    

    return (
        <>
            {isModalOpenDetalle && (
                <div className="modal_overlay" onClick={closeModalDetalle}>
                    <div className="modal_content2">
                        <div className='img_modal'>
                            <img src={img} />
                            <div className='containerBtn'>
                                <button className='btn1' onClick={handleLoginClick}>Login</button>
                                {isModalOpenDetalle && <Modal isOpen={isModalOpenLogin} onClose={closeModal} />}
                                <button className='btn2'>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalDetalle;

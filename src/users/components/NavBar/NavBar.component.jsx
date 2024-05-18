import { Link } from 'react-router-dom';
import './NavBar.styles.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Modal from '../../../auth/pages/Modal';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Login from '../../../auth/pages/Login';
import Notifications from '../notification/Notifications';
import useFetch from '../../../hook/useFecth';


const NavBar = () => {
  const { t, i18n } = useTranslation(["welcome"]);
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const { dataNotification } = useFetch();
  const notifications = dataNotification?.notifications || [];
  const formattedNotifications = notifications.map(notification => notification)


  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
  };

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content)
  };

  const closeModalog = () => {
    setIsModalOpen(false);
    setModalContent(null)
  };

  const openNotification = () => {
    setIsOpenNotification(!isOpenNotification)
  }
  const closeNotification = () => {
    setIsOpenNotification(false)
  }


  return (
    <div className='header'>
      <h1 className='header_title'><Link to='/'><span className='TextColorDifference'>CardsGo</span></Link></h1>
      <nav className='header_menu'>
        <li className={`header_Home`}>
          <Link to='/' onClick={() => handleMenuItemClick('home')}>Home</Link>
        </li>
        <li className={`header_login`}>
          <button className='btnModal' onClick={() => openModal(<Login />)}>Login</button>
        </li>
        <li className={`header_register`}>
          <Link to='/register' onClick={() => handleMenuItemClick('register')}>Sign up</Link>
        </li>
        <li >
          <div className='notification_container'>
            <button className={`header_notification`} onClick={openNotification}>
              <FontAwesomeIcon icon={faBell} style={{ fontSize: '1.5em', color: 'white' }} />
            </button>
            <p className='countNotification'>{formattedNotifications.length}</p>
          </div>
        </li>
      </nav>
      {isModalOpen && <Modal isOpen={isModalOpen} closeModalog={closeModalog} content={modalContent} />}
      {isOpenNotification && <Notifications isOpenNotification={isOpenNotification} closeNotification={closeNotification} />}
    </div>
  );
};

export default NavBar;

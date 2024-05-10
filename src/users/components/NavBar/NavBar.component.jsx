import { Link } from 'react-router-dom';
import './NavBar.styles.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Modal from '../../../auth/pages/Modal';
import React from 'react';


const NavBar = () => {
  const { t, i18n } = useTranslation(["welcome"]);
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModalog = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='header'>
      <h1 className='header_title'><Link to='/'><span className='TextColorDifference'>CardsGo</span></Link></h1>
      <nav className='header_menu'>
        <li className={`header_Home`}>
          <Link to='/' onClick={() => handleMenuItemClick('home')}>Home</Link>
        </li>
        <li className={`header_login`}>
          <button className='btnModal' onClick={openModal}>Login</button>
        </li>
        <li className={`header_register`}>
          <Link to='/register' onClick={() => handleMenuItemClick('register')}>Sign up</Link>
        </li>
      </nav>
      {isModalOpen && <Modal isOpen={isModalOpen} closeModalog={closeModalog} />}
    </div>
  );
};

export default NavBar;

import { Link } from 'react-router-dom'
import './NavBar.styles.css';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';


const NavBar = () => {
  const { t, i18n } = useTranslation(["welcome"]);
  const [activeMenuItem, setActiveMenuItem] = useState('');


  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
  };

  return (
    <div className='header'>
    <h1 className='header_title'><Link to='/'><span className='TextColorDifference'>CardsGo</span></Link></h1>
    <nav className='header_menu'>
      <li className={`header_Home`}>
        <Link to='/' onClick={() => handleMenuItemClick('home')}>Home</Link>
      </li>
      <li className={`header_login`}>
        <Link to='/login' onClick={() => handleMenuItemClick('login')}>Login</Link>
      </li>
      <li className={`header_register`}>
        <Link to='/register' onClick={() => handleMenuItemClick('register')}>Sign up</Link>
      </li>
    </nav>
  </div>
  )
}



export default NavBar;

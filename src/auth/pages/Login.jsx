// Login.js
import React, { useEffect, useState } from 'react';
import './style/login.css';
import { useNavigate } from 'react-router-dom';
import { faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hook/auth';
import Facebook from './Facebook';
import AuthenticatedUserView from './AuthenticatedUserView';
import Google from './Google';

const Login = () => {
  const { isAuthenticated, userData, login, logout } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [isLoggedInFacebook, setIsLoggedInFacebook] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (form.email.trim() === '') {
      errors.email = 'Por favor, ingresa tu correo electrónico.';
    }
    if (form.password.trim() === '') {
      errors.password = 'Por favor, ingresa tu contraseña.';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      setIsLoading(true);
      try {
        const success = await login(form.email, form.password);
        if (success) {
          navigate('/');
          window.location.reload();
        } else {
          setErrorMsg('Credenciales inválidas.');
        }
      } catch (error) {
        setErrorMsg('Error desconocido.');
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  

  return (
    <div className='login'>
      {isAuthenticated || isLoggedInFacebook ? (
        <div className='container_logout'>
          <div className='textAndImg'>
            <div>
              <h1 className='logout_text1'>Hola,</h1>
              <h1 className='Name_users'>{userData.firstName}</h1>
              <h2>Monopoly:</h2>
              <h2>Username: {userData.username}</h2>
              <h2>Email: {(userData.email)}</h2>
              <button>Actualizar</button>
            </div>
            {/* <AuthenticatedUserView
              userData={userData}
            /> */}
          </div>
          <button className='btn_logout' onClick={logout}>
            Logout{" "}
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      ) : (
        <div>
          <form className='Login_form' onSubmit={handleSubmit}>
            <div className='Login_textPrincipal'>
              <h2 className='login_title'>Login</h2>
            </div>
            <label className='login_label'>
              <span className='login_Email'>Email</span>
              <input onChange={handleChange} className='login_input' name='email' type="email" placeholder='Cardsgo@gmail.com' />
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </label>
            <label className='login_label'>
              <span className='login_password'>Password</span>
              <input onChange={handleChange} className='login_input' name='password' type="password" placeholder='************' />
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </label>
            <div>
              <button className='login_btn1' >Login</button>
            </div>
            <div disabled={isLoading}>{isLoading && <FontAwesomeIcon icon={faSpinner} spin />}</div>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
          <Facebook
            isLoggedInFacebook={isLoggedInFacebook}
            setIsLoggedInFacebook={setIsLoggedInFacebook}
          />
          <Google
            isLoggedInFacebook={isLoggedInFacebook}
            setIsLoggedInFacebook={setIsLoggedInFacebook}
          />
        </div>
      )}
    </div>
  );
};

export default Login;

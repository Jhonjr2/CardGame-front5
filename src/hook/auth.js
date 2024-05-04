import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const useAuth = () => {
  const baseUrl = 'https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev/users/login';

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
      if (userDataFromLocalStorage) {
        setUserData(userDataFromLocalStorage);
      }
    }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      console.log('URL de solicitud:', baseUrl); // Agrega este registro
      const options = {
        method: 'POST', 
        url: baseUrl,
        data: { email, password },
        timeout: 10000 // Establece un tiempo de espera de 10 segundos (10000 milisegundos)
      };
      
      const response = await axios.request(options);
      const data = response.data;
      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        const { first_name, last_name, email } = data;
        setUserData({
          firstName: first_name,
          lastName: last_name,
          email: email
        });
        localStorage.setItem('userData', JSON.stringify({ 
          firstName: first_name, 
          lastName: last_name, 
          email 
        }));
        return true;
      } else {
        if (response.status === 401) {
          throw new Error('Credenciales inválidas.');
        } else {
          throw new Error(data.body || 'Error desconocido');
        }
      }
    } catch (error) {
      throw new Error(`Error`);
    }    
  };
  
  const logout = () => {
    navigate('/');
    window.location.reload(true);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUserData({
      firstName: '',
      lastName: '',
      email: ''
    });
  };

  return { isAuthenticated, userData, login, logout };
};

export default useAuth;

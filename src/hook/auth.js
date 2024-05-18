import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const baseUrl = 'https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev/users/login';

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

      const timer = setTimeout(checkTokenExpiration, 60000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (exp * 1000 < Date.now()) {
        logout();
      } else {
        setTimeout(checkTokenExpiration, 10000);
      }
    }
  };

  const login = async (email, password) => {

    const options = {
      method: 'POST',
      url: baseUrl,
      data: { email, password },
      timeout: 10000,
    };

    const response = await axios.request(options);
    const data = response.data;

    if (response.status === 200 && data.token) {
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      const { first_name, last_name, email } = data;
      setUserData({
        firstName: first_name,
        lastName: last_name,
        email: email,
      });
      localStorage.setItem('userData', JSON.stringify({
        firstName: first_name,
        lastName: last_name,
        email,
      }));
      localStorage.setItem('aws_id', data.aws_id);
      localStorage.setItem('username', data.username);
    } else {
      throw new Error('Credenciales inválidas.');
    }

  };



  const logout = () => {
    window.location.reload();
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUserData({
      firstName: '',
      lastName: '',
      email: ''
    });
    localStorage.clear();
  };


  return { isAuthenticated, userData, login, logout };
};

export default useAuth;

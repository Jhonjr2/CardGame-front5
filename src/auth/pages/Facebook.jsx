import React, { useEffect, useState } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import './style/FacebookLogin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Facebook = ({ isLoggedInFacebook, setIsLoggedInFacebook }) => {

    const navigate = useNavigate()

    const handleLoginSuccess = (response) => {
        localStorage.setItem('token', response.accessToken);
        setIsLoggedInFacebook(true);
    };

    const handleLoginFail = (error) => {
        console.log('Login Failed!', error);
    };

    const handleProfileSuccess = (response) => {
        const data = JSON.parse(JSON.stringify(response))
        localStorage.setItem('usersData', data)
        console.log(response)
        window.location.reload();
    };

    if (isLoggedInFacebook || localStorage.getItem('token')) {
        return navigate('/')
    }


    return (
        <div className='container_facebook'>
            <FacebookLogin
                className='btn_facebook'
                appId="424150960558713"
                onSuccess={handleLoginSuccess}
                onFail={handleLoginFail}
                onProfileSuccess={handleProfileSuccess}
                style={{
                    backgroundColor: '#4267b2',
                    color: '#fff',
                    fontSize: '16px',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                <FontAwesomeIcon icon={faFacebook} />
                Login with Facebook
            </FacebookLogin>
        </div>
    );
};

export default Facebook;

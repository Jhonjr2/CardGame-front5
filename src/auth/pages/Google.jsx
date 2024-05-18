import React, { useEffect } from 'react'
import { gapi } from "gapi-script";
import { GoogleLogin } from 'react-google-login'
import './style/Google.css'

const Google = ({ isLoggedInFacebook, setIsLoggedInFacebook }) => {

    const responseGoogle = (response) => {
        localStorage.setItem('token', response.tokenId)
        const data = JSON.parse(JSON.stringify(response))
        localStorage.setItem('usersData', data)
        setIsLoggedInFacebook(true);
        console.log(response);
        window.location.reload();
    }

    useEffect(() => {
        if (isLoggedInFacebook || localStorage.getItem('token')) {
            navigate('/');
        }
    }, [isLoggedInFacebook]);

    return (
        <div className='container_google'>
            <GoogleLogin
                clientId="341255538487-2tq8v4hq8bohef286jh4nj42h2f8au35.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'none'}
                className='googleLogin'
            />
        </div>
    )
}

export default Google;

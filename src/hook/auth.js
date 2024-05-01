import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    
    const baseUrl = 'https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev/users'

    const navigate = useNavigate()
    const [login, setLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setLogin(true);
        }
    }, [login])

    //register
    const createNewUser = data => {
        const url = `${baseUrl}/create`
        axios.post(url, data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    //Login

    const loginUser = data => {
        const url = `${baseUrl}/login`;
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            navigate('/');
            setLogin(true);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };
    

    return {login, createNewUser, loginUser }
}

export default useAuth
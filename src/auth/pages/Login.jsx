import React, { useState } from 'react';
import './style/login.css'
import useAuth from '../../hook/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { handleSubmit, reset, register } = useForm()
  
    const { loginUser } = useAuth()
  
    const submit = data => {
      loginUser(data)
  
      reset({
        email: '',
        password: ''
      })
    }
    const navigate = useNavigate()
  
    const handleLogout = () => {
      localStorage.removeItem('token')
      navigate('/login')
      setActiveMenuItem('home')
      window.location.reload()
  
    }
  
    if (localStorage.getItem('token')) {
  
      return (
        <div className='titleLogin'>
          <img src="" alt="" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )
  
    }
  
    const handleNavigateRegister = () => {
      navigate(`/register`)
      setActiveMenuItem('register')
    }
  
  
  
    return (
      <div className='login'>
        <form className='Login_form' onSubmit={handleSubmit(submit)}>
          <div className='Login_textPrincipal'>
            <h2 className='login_title'>Welcome back to Booking login</h2>
            <p className='longin_subtitle'>It's great to have you back!</p>
          </div>
          <label className='login_label'>
            <span className='login_Email'>Email</span>
            <input className='login_input' {...register('email')} type="email" />
          </label>
          <label className='login_label'>
            <span className='login_password'>Password</span>
            <input className='login_input'  {...register('password')} type="password" />
          </label>
          <div>
            <button className='login_btn1'>Login</button>
            <button  onClick={handleNavigateRegister} className='login_btn'>Register</button> 
          </div>
        </form>
      </div>
    )
  }
  
  export default Login

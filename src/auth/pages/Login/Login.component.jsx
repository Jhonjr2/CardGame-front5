import { Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../shared/Notification/notificationSlice';
import { setAuth, setToken } from '../../authSlice';
import './Login.styles.css'

const Login = () => {

  const { handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async data => {
    setIsLoading(true);
    try {
      const res = await axios.post('/users/login', data);
      dispatch(setToken(res.data.token));
      dispatch(setAuth({
        ...res.data, authStatus: 'authenticated'
      }));
      navigate('/users/all_users');
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(showNotification({
          variant: "danger",
          message: "Invalid credentials",
        }));
      }
    } finally { setIsLoading(false); }
  }

  return (
    <div className='login_container'>
      <h1>Login in with username or email</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3 group" controlId="email">
          <Form.Label className="mb-0"><h3 className='title_input'>Email</h3></Form.Label>
          <Form.Control
            className='login_email'
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          <hr />
        </Form.Group>

        <Form.Group className="mb-5 group" controlId="passworrd">
          <Form.Label className="mb-0"><h3 className='title_input'>Password</h3></Form.Label>
          <Form.Control
            className='login_password'
            type="password"
            placeholder="**********"
            {...register("password")}
          />
          <hr />
          <Link to="/auth/reset_password" className='d-inline-block mt-1'>
            Forgot your password?
          </Link>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className='w-100 btn_form'
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </Form>

      <p className='mt-4 '>
        Don&apos;t have an account? {" "}
        <Link to="/auth/signup"><h8 className='sign'>Sign up</h8></Link>
      </p>
    </div>
  )
}

export default Login
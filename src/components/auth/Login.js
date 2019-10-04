import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Input, Button, Icon, Tooltip, Form } from 'antd';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to home page
      props.history.push('/');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-nextline
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <div className='form-group'>
          <Input
            type='email'
            name='email'
            placeholder='Email Address'
            value={email}
            onChange={onChange}
            onPressEnter={onSubmit}
            required
          />

          <Input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
            onPressEnter={onSubmit}
            required
          />
        </div>
        <Button value='Login' type='primary' block onClick={onSubmit}>
          Login
        </Button>
        Not registered yet?
        <Link to='/register'>
          <Button value='Register' type='link'>
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;

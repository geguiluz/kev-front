import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Input, Button, Icon, Tooltip, Form } from 'antd';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

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

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <div className='form-group'>
          <Input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
            onPressEnter={onSubmit}
          />
          <Input
            type='email'
            name='email'
            placeholder='Email Address'
            value={email}
            onChange={onChange}
            onPressEnter={onSubmit}
          />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
            onPressEnter={onSubmit}
          />
          <Input
            type='password'
            name='password2'
            placeholder='Confirm Password'
            value={password2}
            onChange={onChange}
            onPressEnter={onSubmit}
          />
        </div>
        <Button value='Register' type='primary' block onClick={onSubmit}>
          Register
        </Button>
        Already a user?
        <Link to='/login'>
          <Button value='Register' type='link'>
            Login
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Register;

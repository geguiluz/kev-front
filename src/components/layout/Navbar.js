import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, Button, Icon } from 'antd';
import AuthContext from '../../context/auth/authContext';
import DeviceContext from '../../context/device/deviceContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const deviceContext = useContext(DeviceContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearDevices } = deviceContext;

  const onLogout = () => {
    logout();
    clearDevices();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Button>
          <Icon type='menu' />
        </Button>
        {'  '}
        <i className={icon} />
        {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'KEV 1.0',
  icon: 'fas fa-bolt',
};
export default Navbar;

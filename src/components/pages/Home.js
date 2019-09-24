import React, { useContext, useEffect } from 'react';
import Devices from '../devices/Devices';
import DeviceForm from '../devices/DeviceForm';
import DeviceFilter from '../devices/DeviceFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  // We want to re-load the user every time we refresh
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <DeviceForm />
      </div>
      <div>
        <DeviceFilter />
        <Devices />
      </div>
    </div>
  );
};

export default Home;

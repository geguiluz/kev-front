import React, { useState, useContext, useEffect } from 'react';
import DeviceContext from '../../context/device/deviceContext';

const DeviceForm = () => {
  const deviceContext = useContext(DeviceContext);

  const { addDevice, updateDevice, clearCurrent, current } = deviceContext;

  // We only want this to happen on the ocassion any of these suffer changes:
  // [deviceContext, current]
  useEffect(() => {
    if (current !== null) {
      // We clicked the edit button and we want to set the form to the values of
      // the current device
      setDevice(current);
    } else {
      // Else, just set it to its default state
      setDevice({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [deviceContext, current]);

  const [device, setDevice] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = device;

  // We want to put whatever we type into each of the fields onto the state
  const onChange = e =>
    setDevice({ ...device, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      // We pass all of our form fields since we're passing the state
      addDevice(device);
      clearCurrent();
    } else {
      updateDevice(device);
      clearCurrent();
    }
    //Setting everything back to default after submission
    setDevice({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update Device' : 'Add Device'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Device Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update  Device' : 'Add Device'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default DeviceForm;

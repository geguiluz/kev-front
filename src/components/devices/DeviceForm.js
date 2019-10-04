import React, { useState, useContext, useEffect } from 'react';

import { Input, Button, Icon, Tooltip, Form, Radio } from 'antd';

import 'antd/dist/antd.css';

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
        serialNumber: '',
        name: '',
        macAddress: '',
        isDisabled: false,
        type: '',
      });
    }
  }, [deviceContext, current]);

  const [device, setDevice] = useState({
    serialNumber: '',
    name: '',
    macAddress: '',
    isDisabled: false,
    type: '',
  });

  const { serialNumber, name, macAddress, isDisabled, type } = device;

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
      serialNumber: '',
      name: '',
      macAddress: '',
      isDisabled: false,
      type: '',
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update Device' : 'Add Device'}
      </h2>
      <Input
        type='text'
        placeholder='Name'
        name='name'
        allowClear
        prefix={<Icon type='tag' style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={name}
        onChange={onChange}
      />
      <Input
        type='text'
        placeholder='Serial Number'
        name='serialNumber'
        allowClear
        prefix={<Icon type='setting' style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={serialNumber}
        onChange={onChange}
      />
      <Radio.Group
        defaultValue='Sonoff V1'
        name='type'
        placeholder='Device Type'
        value={type}
        onChange={onChange}
      >
        <Radio value='Sonoff V1'>Sonoff V1</Radio>
        <Radio value='Sonoff V2'>Sonoff V2</Radio>
      </Radio.Group>

      <Input
        type='text'
        placeholder='MAC Address'
        name='macAddress'
        allowClear
        value={macAddress}
        onChange={onChange}
      />

      <div>
        <Button type='primary' block onClick={onSubmit}>
          {current ? 'Update Device' : 'Add Device'}
        </Button>
      </div>
      {current && (
        <div>
          <Button block onClick={clearAll}>
            Clear
          </Button>
        </div>
      )}
    </Form>
  );
};

export default DeviceForm;

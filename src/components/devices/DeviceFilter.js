import React, { useContext, useRef, useEffect } from 'react';

import { Input, Form, Icon } from 'antd';

import 'antd/dist/antd.css';

import DeviceContext from '../../context/device/deviceContext';

const { Search } = Input;

const DeviceFilter = () => {
  const deviceContext = useContext(DeviceContext);
  const text = useRef('');

  const { filterDevices, clearFilter, filtered } = deviceContext;

  // If filtered is null, I want to clear the value of the filter text
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterDevices(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form>
      <Search
        type='text'
        ref={text}
        placeholder='Filter Devices...'
        enterButton
        onChange={onChange}
      />
    </Form>
  );
};
export default DeviceFilter;

import React, { useContext, useRef, useEffect } from 'react';
import DeviceContext from '../../context/device/deviceContext';

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
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter Devices...'
        onChange={onChange}
      />
    </form>
  );
};
export default DeviceFilter;

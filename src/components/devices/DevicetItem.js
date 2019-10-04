import React, { useContext } from 'react';

import { Button, Icon, Row } from 'antd';

import PropTypes from 'prop-types';
import DeviceContext from '../../context/device/deviceContext';

const DeviceItem = ({ device }) => {
  const deviceContext = useContext(DeviceContext);
  const {
    deleteDevice,
    setCurrent,
    clearCurrent,
    toggleDevice,
  } = deviceContext;

  const { _id, serialNumber, name, macAddress, isDisabled, type } = device;

  // Let's pull out the delete action from our context

  const onDelete = () => {
    deleteDevice(_id);
    clearCurrent();
  };

  const onToggle = () => {
    console.log('Toggle fired on ', serialNumber);
    toggleDevice(serialNumber);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <Icon type='tag' theme='filled' style={{ color: 'rgba(0,0,0,.65)' }} />
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={'badge ' + (isDisabled ? 'badge-danger' : 'badge-success')}
        >
          {isDisabled ? 'Disabled' : 'Enabled'}
        </span>
      </h3>
      <ul className='list'>
        {serialNumber && (
          <li>
            <Icon type='setting' style={{ color: 'rgba(0,0,0,.65)' }} />
            {serialNumber}
          </li>
        )}
        {type && (
          <li>
            <Icon type='bulb' style={{ color: 'rgba(0,0,0,.65)' }} /> {type}
          </li>
        )}
        {macAddress && <li>MAC: {macAddress}</li>}
      </ul>
      <Row type='flex' style={{ alignItems: 'center' }}>
        <Button onClick={() => setCurrent(device)}>Edit</Button>
        <Button type='danger' onClick={onDelete}>
          Delete
        </Button>
        <Button type='primary' icon='poweroff' onClick={onToggle}>
          Toggle
        </Button>
      </Row>
    </div>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
};

export default DeviceItem;

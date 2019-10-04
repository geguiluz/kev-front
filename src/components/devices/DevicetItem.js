import React, { useContext } from 'react';

import { Button, Icon, Row, Tooltip, Badge } from 'antd';

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

  const { _id, serialNumber, name, macAddress, deviceStatus, type } = device;

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
        <span style={{ float: 'right' }}>
          <h6>
            <Badge text={'OK'} status={'success'} />
          </h6>
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
        <Tooltip trigger='hover' title='Edit device' placement='bottom'>
          <Button
            onClick={() => setCurrent(device)}
            icon='edit'
            size='large'
          ></Button>
        </Tooltip>
        <Tooltip trigger='hover' title='Delete device' placement='bottom'>
          <Button
            type='danger'
            icon='delete'
            onClick={onDelete}
            size='large'
          ></Button>
        </Tooltip>
        <Tooltip trigger='hover' title='Toggle power on/off' placement='bottom'>
          <Button
            type='primary'
            icon='poweroff'
            size='large'
            onClick={onToggle}
          ></Button>
        </Tooltip>
      </Row>
    </div>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
};

export default DeviceItem;

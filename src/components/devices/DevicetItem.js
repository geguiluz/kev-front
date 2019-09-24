import React, { useContext } from 'react';
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
            <i className='fas fa-tag' />
            {serialNumber}
          </li>
        )}
        {type && (
          <li>
            <i className='fas fa-asterisk' />
            {type}
          </li>
        )}
        {macAddress && (
          <li>
            <i className='fas fa-podcast' />
            {macAddress}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(device)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
        <button className='btn btn-primary btn-sm' onClick={onToggle}>
          Toggle
        </button>
      </p>
    </div>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
};

export default DeviceItem;

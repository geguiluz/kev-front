import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DeviceContext from '../../context/device/deviceContext';

const DeviceItem = ({ device }) => {
  const deviceContext = useContext(DeviceContext);
  const { deleteDevice, setCurrent, clearCurrent } = deviceContext;

  const { _id, name, email, phone, type } = device;

  // Let's pull out the delete action from our context

  const onDelete = () => {
    deleteDevice(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' />
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' />
            {phone}
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
      </p>
    </div>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
};

export default DeviceItem;

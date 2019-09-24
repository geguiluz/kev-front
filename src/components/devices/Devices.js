import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DeviceItem from './DevicetItem';
import Spinner from '../layout/Spinner';
import DeviceContext from '../../context/device/deviceContext';

const Devices = () => {
  const deviceContext = useContext(DeviceContext);

  const { devices, filtered, loading, getDevices } = deviceContext;

  useEffect(() => {
    getDevices();
    //es-lint-disable-next-line
  }, []);

  if (
    typeof devices === 'undefined' ||
    (devices !== null && devices.length === 0)
  ) {
    return <h4>Please add a device</h4>;
  }
  return (
    <div>
      <Fragment>
        {devices !== null && !loading ? (
          <TransitionGroup>
            {filtered !== null
              ? filtered.map(device => (
                  <DeviceItem key={device._id} device={device} />
                ))
              : devices.map(device => (
                  <CSSTransition
                    key={device._id}
                    timeout={500}
                    classNames='item'
                  >
                    <DeviceItem device={device} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </Fragment>
    </div>
  );
};

export default Devices;

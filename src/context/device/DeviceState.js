import React, { useReducer } from 'react';
import axios from 'axios';
import DeviceContext from './deviceContext';
import deviceReducer from './deviceReducer';
import {
  ADD_DEVICE,
  GET_DEVICES,
  DEVICE_ERROR,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  CLEAR_DEVICES,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  FILTER_DEVICE,
} from '../types';

const DeviceState = props => {
  // Added a "current" key to the state object, so that when we click edit,
  // whatever contact we clicked edit for, to be put into this piece of state,
  // so that we can change things on the UI based on that
  const initialState = {
    devices: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(deviceReducer, initialState);

  // Get devices
  // Add devices
  const getDevices = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/devices`
      );
      dispatch({
        type: GET_DEVICES,
        payload: res.data,
      });
    } catch (err) {
      // TODO: err.response.msg is failing
      dispatch({
        type: DEVICE_ERROR,
        payload: err.response,
      });
    }
  };

  // Add Contact
  const addDevice = async device => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/devices`,
        device,
        config
      );
      dispatch({
        type: ADD_DEVICE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DEVICE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Contact
  const deleteDevice = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/devices/${id}`);
    } catch (err) {
      dispatch({
        type: DEVICE_ERROR,
        payload: err.response.msg,
      });
    }
    dispatch({
      type: DELETE_DEVICE,
      payload: id,
    });
  };

  // Update device
  const updateDevice = async device => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/devices/${device._id}`,
        device,
        config
      );
      dispatch({
        type: UPDATE_DEVICE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DEVICE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear Current device
  const clearDevices = () => {
    dispatch({ type: CLEAR_DEVICES });
  };

  // Set Current device
  const setCurrent = device => {
    dispatch({ type: SET_CURRENT, payload: device });
  };

  // Clear Current device
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter device
  const filterDevices = text => {
    dispatch({ type: FILTER_DEVICE, payload: text });
  };

  // Clear Filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // It's important to add all functions in the context because we're providing
  // this function to our controler
  return (
    <DeviceContext.Provider
      value={{
        devices: state.devices,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getDevices,
        addDevice,
        deleteDevice,
        setCurrent,
        clearCurrent,
        updateDevice,
        filterDevices,
        clearFilter,
        clearDevices,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceState;

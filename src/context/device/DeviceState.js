import React, { useReducer } from 'react';
import axios from 'axios';
import mqtt from 'async-mqtt';

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
  TOGGLE_DEVICE,
} from '../types';

let apiUrl;

if (process.env.NODE_ENV !== 'production') {
  apiUrl = process.env.REACT_APP_API_URL;
} else {
  // apiUrl = process.env.API_URL;
  apiUrl = 'https://kev-back.herokuapp.com';
}

const DeviceState = props => {
  // Added a "current" key to the state object, so that when we click edit,
  // whatever contact we clicked edit for, to be put into this piece of state,
  // so that we can change things on the UI based on that
  const initialState = {
    devices: null,
    current: null,
    filtered: null,
    error: null,
    deviceStatus: '?',
  };

  const [state, dispatch] = useReducer(deviceReducer, initialState);

  // Get devices
  // Add devices
  const getDevices = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/devices`);
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
      const res = await axios.post(`${apiUrl}/api/devices`, device, config);
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
      await axios.delete(`${apiUrl}/api/devices/${id}`);
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

  // Update device <----- I think this function is not working yet
  const updateDevice = async (_id, serialNumber) => {
    try {
      // Start mqtt client
      // Subscribe to topic
      // Wait for message
      console.log(
        'Attempting MQTT Connection with',
        `${process.env.REACT_APP_API_MQTT_URL}:${process.env.REACT_APP_API_MQTT_PORT}`
      );

      const client = mqtt.connect(
        `${process.env.REACT_APP_API_MQTT_URL}:${process.env.REACT_APP_API_MQTT_PORT}`,
        {
          username: process.env.REACT_APP_API_MQTT_USER,
          password: process.env.REACT_APP_API_MQTT_PASSWORD,
        }
      );
      const subTopic = `stat/${serialNumber}_fb/POWER`;
      client.on('connect', async () => {
        console.log('Connection established');
        console.log('Client connected', client);
        await client.subscribe(subTopic);
        console.log('Subscribed to topic ', subTopic);
      });
      client.on('message', async (topic, payload) => {
        if (topic === subTopic) {
          console.log('Matching topic');
          // dispatch({
          //   type: UPDATE_DEVICE,
          //   payload: payload.toString,
          // });
        }
      });
    } catch (err) {
      console.log('Error');
      // dispatch({
      //   type: DEVICE_ERROR,
      //   payload: err.response.msg,
      // });
    }
  };

  // Toggle device
  const toggleDevice = async (_id, serialNumber) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${apiUrl}/api/telematics/toggleDevice`,
        { _id, serialNumber },
        config
      );
      dispatch({
        type: TOGGLE_DEVICE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DEVICE_ERROR,
        payload: err.response.msg,
      });
    }
    dispatch({ type: CLEAR_DEVICES });
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
        toggleDevice,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceState;

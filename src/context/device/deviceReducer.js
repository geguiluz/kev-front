// TODO: Create types file
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

export default (state, action) => {
  switch (action.type) {
    case GET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        loading: false,
      };
    case ADD_DEVICE:
      return {
        ...state,
        devices: [action.payload, ...state.devices],
        loading: false,
      };
    case TOGGLE_DEVICE:
      return {
        ...state,
        devices: state.devices.map(device => {
          if (device._id === action.payload._id) {
            let { name, macAddress, type } = device;
            let { _id, deviceStatus, serialNumber } = action.payload;
            return { _id, serialNumber, name, macAddress, type, deviceStatus };
          } else {
            return device;
          }
        }),
        loading: false,
      };
    case UPDATE_DEVICE:
      return {
        ...state,
        devices: state.devices.map(device =>
          device._id === action.payload._id ? action.payload : device
        ),
        loading: false,
      };
    case DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter(device => device._id !== action.payload),
        loading: false,
      };
    case CLEAR_DEVICES:
      return {
        ...state,
        contacts: null,
        filters: null,
        current: null,
        error: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_DEVICE:
      return {
        ...state,
        filtered: state.devices.filter(device => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return device.name.match(regex) || device.serialNumber.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case DEVICE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    // TODO: Add other action types
    default:
      return state;
  }
};

import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';
import { async } from 'q';

const AuthState = props => {
  // Added a "current" key to the state object, so that when we click edit,
  // whatever contact we clicked edit for, to be put into this piece of state,
  // so that we can change things on the UI based on that
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth`);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // We defined the proxy on package.json, so we can access our api as
      // /api/users
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users`,
        formData,
        config
      );
      //
      // The payload will be the token (res.data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // This gets the user from the state
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // We defined the proxy on package.json, so we can access our api as
      // /api/users
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth`,
        formData,
        config
      );
      //
      // The payload will be the token (res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // This gets the user from the state
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // Logout
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // It's important to add all functions in the context because we're providing
  // this function to our controler
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// In order for this to work, er pass in whatever component that the user is
// trying to access and every prop pr state that's being passed in (hence the
// '...rest' spread operator)
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;
  return (
    // Here we're creating a private route component. If user is not logged in,
    // it will redirect to the login screen
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;

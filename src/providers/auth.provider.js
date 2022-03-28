import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
// utils
import { getUserFromToken, setSession } from '../utils/jwt';

import { authActions } from '../slices/auth.slice';

AuthContext.propTypes = {
  children: PropTypes.node
};

function AuthContext({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      const user = getUserFromToken(accessToken);
      if (user) {
        setSession(accessToken);

        dispatch(
          authActions.initialize({
            isAuthenticated: true,
            user
          })
        );
      } else {
        dispatch(
          authActions.initialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    };
    initialize();
  }, []);

  return <>{children}</>;
}

export { AuthContext };

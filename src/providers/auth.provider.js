import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
// utils
import { getUserFromToken, setSession } from '../utils/jwt';

import { initialize as initializePlatform } from '../redux/slices/auth';
import { getCart } from '../redux/slices/cart';

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

        initializePlatform({
          isAuthenticated: true,
          user
        });
      } else {
        initializePlatform({
          isAuthenticated: false,
          user: null
        });
      }

      // Update user cart
      dispatch(getCart());
    };
    initialize();
  }, []);

  return <>{children}</>;
}

export { AuthContext };

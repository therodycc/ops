import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// next
import { useRouter } from 'next/router';
// hooks

import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useSelector(state => state.auth);

  const { pathname, push, replace } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      replace(PATH_AUTH.login);
    }

    return <Login />;
  }

  return <>{children}</>;
}

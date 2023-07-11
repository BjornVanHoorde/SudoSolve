// --- INFO -------
// Check als een user al is ingelogd en redirect naar login als dit niet zo is.


// --- IMPORTS ----
import Login from '../pages/auth/login';
import PropTypes from 'prop-types';
import LoadingScreen from '../components/loading-screen';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// --- EXPORTS ----
export default function AuthGuard({ children }) {

  // --- VARIABLES ---
  const { pathname, push } = useRouter();
  const { isAuthenticated, isInitialized } = useAuthContext();

  // --- STATES ------
  const [requestedLocation, setRequestedLocation] = useState(null);

  // --- EFFECTS -----
  useEffect(() => {

    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <> {children} </>;
}

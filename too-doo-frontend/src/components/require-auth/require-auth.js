import React from 'react';
import { node } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { LINKS } from '../../util/constants';
import useIsAuthorized from '../../hooks/use-is-authorized';


function RequireAuth({ children }) {
  const isAuthorized = useIsAuthorized();
  return isAuthorized
    ? children
    : <Navigate to={LINKS.signIn} replace={true} />
}

RequireAuth.propTypes = {
  children: node
};

export default RequireAuth;
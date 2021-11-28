import React from 'react';
import { node } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { LINKS } from '../../util/constants';
import useIsAuthorized from '../../hooks/use-is-authorized';


function RequireAuth({ children }) {
  const isAuthorized = useIsAuthorized();
  return isAuthorized
    ? children
    : <Redirect to={LINKS.signIn} replace={true} />
}

RequireAuth.propTypes = {
  children: node
};

export default RequireAuth;
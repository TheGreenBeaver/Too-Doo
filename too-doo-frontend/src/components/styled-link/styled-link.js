import React from 'react';
import { node, object, string } from 'prop-types';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';


function StyledLink({ to, children, sx, ...otherProps }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      sx={{
        color: 'secondary.main',
        textDecoration: 'none !important',
        '&:hover': {
          textDecoration: 'none',
          color: 'secondary.dark',
          ...sx?.['&:hover']
        },
        ...sx
      }}
      {...otherProps}
    >
      {children}
    </Link>
  );
}

StyledLink.propTypes = {
  to: string.isRequired,
  children: node.isRequired,
  sx: object
};

export default StyledLink;
import React from 'react';
import { object, oneOf } from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';


const POSITION = {
  left: 'left',
  right: 'right'
};

function SmallSpinner({ position, sx, ...other }) {
  const theme = useTheme();
  const posLetter = position === POSITION.left ? 'r' : 'l';
  return (
    <CircularProgress
      sx={{ ...sx, [`m${posLetter}`]: 2 }}
      size={theme.typography.fontSize}
      {...other}
    />
  );
}

SmallSpinner.propTypes = {
  position: oneOf([...Object.values(POSITION)]),
  sx: object
};

SmallSpinner.defaultProps = {
  position: POSITION.left
};

SmallSpinner.POSITION = POSITION;

export default SmallSpinner;
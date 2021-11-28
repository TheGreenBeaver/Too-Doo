import React from 'react';
import { node } from 'prop-types';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import SmallSpinner from '../small-spinner';


function LoadingButton({ children, ...otherProps }) {

  const { isSubmitting } = useFormikContext();

  return (
    <Button type='submit' color='primary' {...otherProps} >
      {isSubmitting && <SmallSpinner sx={{ color: 'primary.contrastText' }} />}
      {children}
    </Button>
  );
}

LoadingButton.propTypes = {
  children: node.isRequired,
};

export default LoadingButton;
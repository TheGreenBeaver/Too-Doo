import React, { useRef } from 'react';
import { node } from 'prop-types';
import { SnackbarProvider } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';


function AlertSystem({ children }) {
  const snackbarRef = useRef(null);

  function closeSnackbar(key) {
    snackbarRef.current.closeSnackbar(key);
  }

  return (
    <SnackbarProvider
      ref={snackbarRef}
      action={key =>
        <IconButton onClick={() => closeSnackbar(key)}>
          <Close />
        </IconButton>
      }
    >
      {children}
    </SnackbarProvider>
  );
}

AlertSystem.propTypes = {
  children: node.isRequired
};

export default AlertSystem;
import React, { useState } from 'react';
import { string } from 'prop-types';
import { TextField } from 'formik-mui';
import InputAdornment from '@mui/material/InputAdornment';
import { Field } from 'formik';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function PasswordField({ name }) {

  const [visible, setVisible] = useState(false);

  return (
    <Field
      component={TextField}
      label='Password'
      name={name}
      type={visible ? 'text' : 'password'}
      autoComplete='current-password'
      InputProps={{
        endAdornment:
          <InputAdornment
            position='end'
            onClick={() => setVisible(curr => !curr)}
            style={{ height: 'fit-content' }}
            component={IconButton}
          >
            {visible ? <VisibilityOff /> : <Visibility />}
          </InputAdornment>
      }}
    />
  );
}

PasswordField.propTypes = {
  name: string
}

PasswordField.defaultProps = {
  name: 'password'
};

export default PasswordField;
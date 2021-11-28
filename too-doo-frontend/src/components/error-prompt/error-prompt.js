import React from 'react';
import { string } from 'prop-types';
import FormHelperText from '@mui/material/FormHelperText';


function ErrorPrompt({ text }) {
  if (!text) {
    return null;
  }
  return (
    <FormHelperText error>
      {text}
    </FormHelperText>
  );
}

ErrorPrompt.propTypes = {
  text: string
};

export default ErrorPrompt;
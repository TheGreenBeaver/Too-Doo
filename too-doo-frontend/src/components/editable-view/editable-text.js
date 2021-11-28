import React from 'react';
import { string, object } from 'prop-types';
import { useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function EditableText({ name, typographyProps, ...otherProps }) {
  const { status, isSubmitting, errors, touched, getFieldProps } = useFormikContext();

  const isEditing = status?.isEditing;
  const err = touched[name] && errors[name];

  const field = getFieldProps(name);

  if (!isEditing) {
    return <Typography {...typographyProps}>{field.value}</Typography>
  }

  return (
    <TextField
      margin='dense'
      fullWidth={false}
      {...field}
      disabled={isSubmitting}
      error={!!err}
      helperText={err}
      {...otherProps}
    />
  );
}

EditableText.propTypes = {
  name: string.isRequired,
  typographyProps: object
};

export default EditableText;
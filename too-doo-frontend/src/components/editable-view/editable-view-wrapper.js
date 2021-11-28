import React from 'react';
import { any, bool, func, node, elementType, object } from 'prop-types';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Edit } from '@mui/icons-material';


function EditableViewWrapper({
  children,
  isEditable,
  isEditingInitially,
  onSubmit,
  onCancel,
  initialValues,
  validationSchema,
  ExtraActions
}) {
  return (
    <Formik
      initialStatus={{ isEditing: isEditingInitially }}
      onSubmit={(values, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        formikHelpers.setStatus({ isEditing: false });
        onSubmit(values, formikHelpers);
      }}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {
        formik =>
          <Form>
            <Card>

              <CardContent style={{ display: 'block' }}>
                {children}
              </CardContent>

              {
                isEditable &&
                <CardActions>
                  {
                    formik.status.isEditing &&
                    <React.Fragment>
                      <Button
                        variant='outlined'
                        onClick={() => {
                          formik.resetForm();
                          formik.setStatus({ isEditing: false });
                          onCancel?.();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type='submit'>
                        Save
                      </Button>
                    </React.Fragment>
                  }
                  {
                    !formik.status.isEditing &&
                    <Button
                      onClick={() => formik.setStatus({ isEditing: true })}
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                  }
                  {
                    ExtraActions &&
                    <ExtraActions formik={formik} />
                  }
                </CardActions>
              }

            </Card>
          </Form>
      }
    </Formik>
  );
}

EditableViewWrapper.propTypes = {
  children: node.isRequired,
  isEditable: bool,
  isEditingInitially: bool,
  onSubmit: func.isRequired,
  onCancel: func,
  initialValues: object.isRequired,
  validationSchema: any,
  ExtraActions: elementType
};

EditableViewWrapper.defaultProps = {
  isEditable: true,
  isEditingInitially: false
};

export default EditableViewWrapper;
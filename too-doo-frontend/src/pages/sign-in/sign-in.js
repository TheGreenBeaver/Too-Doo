import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import PasswordField from '../../components/password-field';
import StyledLink from '../../components/styled-link';
import formSX from '../../theme/form';
import { ERR_FIELD, LINKS } from '../../util/constants';
import LoadingButton from '../../components/loading-button';
import ErrorPrompt from '../../components/error-prompt';
import { useDispatch } from 'react-redux';
import { logInAction } from '../../store/actions/account';
import { useHistory } from 'react-router-dom';
import apiService from '../../util/api';


function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credentialsError, setCredentialsError] = useState(null);

  function onSubmit(values, formikHelpers) {
    setCredentialsError(null);
    formikHelpers.setSubmitting(true);
    apiService.signIn(values)
      .then(data => {
        dispatch(logInAction(data.token));
        history.replace(LINKS.home);
      })
      .catch(e => {
        formikHelpers.setSubmitting(false);
        setCredentialsError(e.response.data[ERR_FIELD][0]);
      });
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        username: Yup.string().required('Please enter your username'),
        password: Yup.string().required('Please enter your password')
      })}
    >
      <Form>
        <Field
          component={TextField}
          name='username'
          label='Username'
          autoComplete='username'
        />
        <PasswordField />

        <LoadingButton sx={formSX.submitBtn}>
          Sign In
        </LoadingButton>
        <ErrorPrompt text={credentialsError} />
        <StyledLink to='/sign_up' sx={formSX.redirect}>
          Don't have an account yet
        </StyledLink>
      </Form>
    </Formik>
  );
}

export default SignIn;
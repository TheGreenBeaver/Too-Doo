import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import PasswordField from '../../components/password-field';
import StyledLink from '../../components/styled-link';
import formSX from '../../theme/form';
import { useSnackbar } from 'notistack';
import { useAxios } from '../../contexts/axios-context';
import { HTTP_ENDPOINTS, LINKS } from '../../util/constants';
import LoadingButton from '../../components/loading-button';
import { startCase } from 'lodash';
import { useDispatch } from 'react-redux';
import { logInAction } from '../../store/actions/account';
import { useNavigate } from 'react-router-dom';


const FIELDS = [
  { field: 'username', max: 50 },
  { field: 'password', max: 100 }
];
const yupConfig = FIELDS.reduce((config, f) => ({
  ...config,
  [f.field]: Yup.string().required(`${startCase(f.field)} is required`).max(f.max)
}), {});

function SignUp() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { api } = useAxios();
  const dispatch = useDispatch();

  function onSubmit(values, formikHelpers) {
    formikHelpers.setSubmitting(true);
    api(HTTP_ENDPOINTS.signUp, values).call()
      .then(data => {
        enqueueSnackbar('Signed up for Too Doo successfully!', { variant: 'success' });
        dispatch(logInAction(data.token));
        navigate(LINKS.home, { replace: true });
      })
      .catch(e => {
        formikHelpers.setSubmitting(false);
        formikHelpers.setErrors(e.response.data);
      });
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={Yup.object(yupConfig)}
      onSubmit={onSubmit}
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
          Sign Up
        </LoadingButton>
        <StyledLink to={LINKS.signIn} sx={formSX.redirect}>
          Already have an account
        </StyledLink>
      </Form>
    </Formik>
  );
}

export default SignUp;
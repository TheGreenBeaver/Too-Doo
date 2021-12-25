import React from 'react';
import EditableText from './index';
import { Form, Formik } from 'formik';
import { fireEvent, render } from '@testing-library/react';


const TOGGLE = 'toggle';
const TEST_ID = 'typography';

function Wrapper({ children }) {
  return (
    <Formik
      initialStatus={{ isEditing: true }}
      initialValues={{ text: '' }}
      onSubmit={() => {}}
    >
      {
        formik =>
          <Form>
            <button onClick={() => formik.setStatus({ isEditing: false })}>
              {TOGGLE}
            </button>
            {children}
          </Form>
      }
    </Formik>
  );
}

it('Should render different components for different editing states', () => {
  const { queryByTestId, container, queryByText } = render(
    <EditableText name='text' typographyProps={{ 'data-testid': TEST_ID }} />,
    { wrapper: Wrapper }
  );

  const inputEl = container.querySelector('.MuiTextField-root');
  expect(inputEl).toBeInTheDocument();

  fireEvent.click(queryByText(TOGGLE));

  const typographyEl = queryByTestId(TEST_ID);
  expect(typographyEl).toBeInTheDocument();
});
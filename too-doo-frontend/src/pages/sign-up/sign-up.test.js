import { renderWithRouter, TRACKER } from '../../util/testing';
import SignUp from './index';
import { fireEvent, waitFor } from '@testing-library/react';
import apiService from '../../util/api';
import { LINKS } from '../../util/constants';


const USED_USERNAME = 'Jack Sparrow';
const TOKEN = 't o k e n';
const MSG = 'User with such username already exists';

it('Sign Up page', async () => {
  jest
    .spyOn(apiService, 'signUp')
    .mockImplementation(({ username }) => username === USED_USERNAME
      ? Promise.reject({ response: { data: { username: MSG } } })
      : Promise.resolve({ token: TOKEN })
    );

  const { queryByText, container, getByTestId } = renderWithRouter(
    <SignUp />, { initialEntries: ['/sign_up'] }
  );

  const allInputs = container.querySelectorAll('input');
  const submitBtn = queryByText('Sign Up');

  const usernameInp = allInputs[0];
  fireEvent.change(usernameInp, { target: { value: USED_USERNAME } });

  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(queryByText('Password is required')).toBeInTheDocument();
  });

  const passwordInp = allInputs[1];
  fireEvent.change(passwordInp, { target: { value: '123' } });

  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(submitBtn.hasAttribute('disabled')).toBeFalsy();
  });
  expect(queryByText(MSG)).toBeInTheDocument();

  fireEvent.change(usernameInp, { target: { value: 'Hector Barbossa' } });
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(getByTestId(TRACKER).innerHTML).toBe(LINKS.home);
  });

  jest.resetAllMocks();
});
import { account } from './action-types';


const logOutAction = () => ({
  type: account.LOG_OUT
});

const logInAction = token => ({
  type: account.LOG_IN,
  token
});

const setUserData = userData => ({
  type: account.SET_USER_DATA,
  userData
});

export {
  logOutAction,
  setUserData,
  logInAction
};
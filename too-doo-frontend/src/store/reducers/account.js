import { account } from '../actions/action-types';
import { clearCredentials, getCredentials, saveCredentials } from '../../util/auth';


const initialState = {
  userData: null,
  isAuthorized: !!getCredentials()
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case account.SET_USER_DATA:
      return { ...state, userData: action.userData };
    case account.LOG_IN:
      saveCredentials(action.token);
      return { ...state, isAuthorized: true };
    case account.LOG_OUT:
      clearCredentials();
      return { isAuthorized: false, userData: null };
    default:
      return state;
  }
}

export default reducer;
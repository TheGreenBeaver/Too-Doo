import { useSelector } from 'react-redux';


function useIsAuthorized() {
  return useSelector(state => state.account.isAuthorized);
}

export default useIsAuthorized;
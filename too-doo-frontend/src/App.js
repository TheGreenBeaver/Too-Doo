import { Route, Routes } from 'react-router-dom';
import FullScreenLayout from './components/full-screen-layout';
import OneCardLayout from './components/one-card-layout';
import { HTTP_ENDPOINTS, LINKS } from './util/constants';
import RequireAuth from './components/require-auth';
import useClearPath from './hooks/use-clear-path';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from './store/actions/general';
import { setUserData } from './store/actions/account';
import { useAxios } from './contexts/axios-context';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';


function App() {
  const { isAuthorized, userData } = useSelector(state => state.account);
  const clearPathname = useClearPath();
  const dispatch = useDispatch();
  const { api } = useAxios();
  const { error } = useSelector(state => state.general);

  const Layout = isAuthorized ? FullScreenLayout : OneCardLayout;

  useEffect(() => {
    dispatch(clearError());
  }, [clearPathname]);

  useEffect(() => {
    if (isAuthorized) {
      api(HTTP_ENDPOINTS.getCurrentUserData).call()
        .then(data => dispatch(setUserData(data)));
    }
  }, [isAuthorized]);

  if (error) {
    return 'error!';
  }

  if (isAuthorized && !userData) {
    return 'loading...';
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path={LINKS.home}
          element={
            <RequireAuth>
              <div>Home</div>
            </RequireAuth>
          }
        />
        <Route path={LINKS.signUp} element={<SignUp />} />
        <Route path={LINKS.signIn} element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;

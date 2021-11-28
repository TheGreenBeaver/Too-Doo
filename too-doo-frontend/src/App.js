import { Route, Switch, Redirect } from 'react-router-dom';
import FullScreenLayout from './components/full-screen-layout';
import OneCardLayout from './components/one-card-layout';
import { HTTP_ENDPOINTS, LINKS } from './util/constants';
import useClearPath from './hooks/use-clear-path';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from './store/actions/general';
import { setUserData } from './store/actions/account';
import { useAxios } from './contexts/axios-context';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Home from './pages/home';


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
    <Layout>
      <Switch>
        <Route path={`${LINKS.home}/:state?`} component={Home} />
        <Route path={LINKS.signUp} component={SignUp} />
        <Route path={LINKS.signIn} component={SignIn} />
        <Redirect to={LINKS.home} />
      </Switch>
    </Layout>
  );
}

export default App;

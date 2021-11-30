import { Route, Switch, Redirect } from 'react-router-dom';
import FullScreenLayout from './components/full-screen-layout';
import OneCardLayout from './components/one-card-layout';
import { HTTP_ENDPOINTS } from './util/constants';
import useClearPath from './hooks/use-clear-path';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from './store/actions/general';
import { setUserData } from './store/actions/account';
import { useAxios } from './contexts/axios-context';
import { getDefaultRoute, routes } from './util/routing';


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
        {
          routes
            .filter(routeConfig => routeConfig.auth === isAuthorized)
            .map(routeConfig =>
              <Route
                key={routeConfig.path}
                path={routeConfig.path}
                component={routeConfig.component}
              />
            )
        }
        <Redirect to={getDefaultRoute(isAuthorized)} />
      </Switch>
    </Layout>
  );
}

export default App;

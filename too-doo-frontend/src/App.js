import { Route, Switch, Redirect } from 'react-router-dom';
import FullScreenLayout from './components/full-screen-layout';
import OneCardLayout from './components/one-card-layout';
import useClearPath from './hooks/use-clear-path';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from './store/actions/general';
import { setUserData } from './store/actions/account';
import { getDefaultRoute, pathExists, routes } from './util/routing';
import ErrorPage from './pages/error-page';
import Loading from './components/loading';
import { omit } from 'lodash';
import apiService from './util/api';
import useErrorHandler from './hooks/use-error-handler';
import axios from 'axios';


function App() {
  const { isAuthorized, userData } = useSelector(state => state.account);
  const clearPathname = useClearPath();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.general);

  const Layout = isAuthorized ? FullScreenLayout : OneCardLayout;

  const handleBackendError = useErrorHandler();
  useEffect(() => {
    apiService.instance.interceptors.response.use(
      r => r,
      e => !handleBackendError(e) && !axios.isCancel(e)
        ? Promise.reject(e)
        : Promise.resolve({})
    );
  }, []);

  useEffect(() => {
    dispatch(clearError());

    return () => {
      if (pathExists(clearPathname)) {
        Object.entries(apiService.tokens)
          .forEach(([id, { cancelOnPathChange }]) => {
            if (cancelOnPathChange) {
              apiService.cancelById(id);
            }
          });
      }
    };
  }, [clearPathname]);

  useEffect(() => {
    return () => {
      for (const id of Object.keys(apiService.tokens)) {
        apiService.cancelById(id);
      }
    };
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      apiService.getCurrentUserData()
        .then(data => dispatch(setUserData(data)));
    }
  }, [isAuthorized]);

  if (error) {
    return <ErrorPage/>;
  }

  if (isAuthorized && !userData) {
    return <Loading/>;
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
                {...omit(routeConfig, 'auth')}
              />
            )
        }
        <Redirect to={getDefaultRoute(isAuthorized)}/>
      </Switch>
    </Layout>
  );
}

export default App;

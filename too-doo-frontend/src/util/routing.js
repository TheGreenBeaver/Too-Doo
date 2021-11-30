import { LINKS } from './constants';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import Home from '../pages/home';


const routes = [
  {
    path: LINKS.signIn,
    component: SignIn,
    auth: false
  },
  {
    path: LINKS.signUp,
    component: SignUp,
    auth: false
  },

  {
    path: `${LINKS.home}/:state?`,
    component: Home,
    auth: true
  }
];

function getDefaultRoute(isAuthorized) {
  return isAuthorized ? LINKS.home : LINKS.signIn;
}

export { routes, getDefaultRoute };
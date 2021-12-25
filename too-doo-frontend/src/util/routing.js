import { LINKS } from './constants';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import Home from '../pages/home';


const routes = [
  {
    path: LINKS.signIn,
    component: SignIn,
    auth: false,
    exact: true
  },
  {
    path: LINKS.signUp,
    component: SignUp,
    auth: false,
    exact: true
  },

  {
    path: `${LINKS.home}/:state(new|\\d+)?`,
    component: Home,
    auth: true,
    exact: true
  }
];

function getPathRegex(path) {
  const splPath = path.split('/');
  const modifiedPath = splPath.map(pathPart => {
    if (pathPart.startsWith(':')) {
      const firstBraceIdx = pathPart.indexOf('(');
      const lastBraceIdx = pathPart.lastIndexOf(')');

      const isRequired = !pathPart.endsWith('?');
      const hasPattern = firstBraceIdx !== -1 && lastBraceIdx !== -1 && lastBraceIdx - firstBraceIdx > 1;
      const situation = `${+isRequired}${+hasPattern}`;
      switch (situation) {
        case '00':
          return '?[^/]*';
        case '01':
          return `?(${pathPart.substring(firstBraceIdx + 1, lastBraceIdx)})?`;
        case '10':
          return '[^/]+';
        case '11':
          return pathPart.substring(firstBraceIdx + 1, lastBraceIdx);
        default:
          return ''
      }
    }
    return pathPart;
  });
  return RegExp(`^${modifiedPath.join('/')}$`);
}

const patternRoutes = routes.map(({ path }) => getPathRegex(path));

function pathExists(thePath) {
  return !!patternRoutes.find(pattern => pattern.test(thePath));
}

function getDefaultRoute(isAuthorized) {
  return isAuthorized ? LINKS.home : LINKS.signIn;
}

export { routes, getDefaultRoute, pathExists, getPathRegex };
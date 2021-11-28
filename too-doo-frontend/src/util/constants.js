const ERR_FIELD = 'nonFieldErrors';

const HTTP_METHODS = {
  post: { name: 'post', withData: true },
  get: { name: 'get' },
  patch: { name: 'patch', withData: true },
  delete: { name: 'delete' },
};
const HTTP_ENDPOINTS = {
  signIn: {
    method: HTTP_METHODS.post,
    url: '/auth/sign_in',
    cancelOnPathChange: true
  },
  signUp: {
    method: HTTP_METHODS.post,
    url: '/users'
  },
  getCurrentUserData: {
    method: HTTP_METHODS.get,
    url: '/users/me',
    withAuth: true
  },
  logOut: {
    method: HTTP_METHODS.post,
    url: '/auth/log_out',
    withAuth: true
  },
};

const LINKS = {
  home: '/',
  signIn: '/sign_in',
  signUp: '/sign_up'
};

const OOPS = 'Some temporary issues, please try again later';

const ENVS = {
  dev: 'development',
  prod: 'production',
};

const API_ROOT = '/api';

export {
  ERR_FIELD,
  HTTP_ENDPOINTS,
  LINKS,
  OOPS,
  ENVS,
  API_ROOT
};
import { ENVS } from './constants';


function applyToOneOrMany(args, callback) {
  return Array.isArray(args) ? args.map(arg => callback(arg)) : callback(args);
}

function getVar(name, defaultVal = '') {
  return process.env[name] || defaultVal;
}

function isDev() {
  return getVar('NODE_ENV', ENVS.dev).toLowerCase() === ENVS.dev;
}

function getOrigin() {
  return isDev() ? 'http://localhost:8000' : window.location.origin;
}

export {
  applyToOneOrMany,
  getOrigin
};
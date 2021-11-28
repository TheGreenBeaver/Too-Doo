import { ENVS } from './constants';
import { padStart } from 'lodash';


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

function toTwo(str) {
  return padStart(`${str}`, 2, '0');
}

function formatTime(timeString) {
  const asDate = new Date(timeString);
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(asDate);
  const year = asDate.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(asDate);
  const date = toTwo(asDate.getDate());
  const hours = toTwo(asDate.getHours());
  const minutes = toTwo(asDate.getMinutes());
  const seconds = toTwo(asDate.getSeconds())

  return `${day} ${month} ${date}, ${year} ${hours}:${minutes}:${seconds}`
}

export {
  applyToOneOrMany,
  getOrigin,
  formatTime
};
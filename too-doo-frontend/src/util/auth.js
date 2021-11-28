const TOKEN = 'token';

function saveCredentials(token) {
  localStorage.setItem(TOKEN, token);
}

function clearCredentials() {
  localStorage.removeItem(TOKEN);
}

function getCredentials() {
  return localStorage.getItem(TOKEN);
}

function getHeaders(headers = {}) {
  return { ...headers, Authorization: `Token ${getCredentials()}` };
}

export {
  saveCredentials,
  clearCredentials,
  getCredentials,
  getHeaders
};
class AuthError extends Error {
  /**
   *
   * @param {boolean=} [credentials = false] is it the problem with credentials
   */
  constructor(credentials = false) {
    super();
    this.credentials = credentials;
  }
}


module.exports = {
  AuthError
};
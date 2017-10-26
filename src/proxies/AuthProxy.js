import Proxy from './Proxy';
import AuthTransformer from '../transformers/AuthTransformer';

class AuthProxy extends Proxy {
  /**
   * The constructor for the AuthProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('Users', parameters, AuthTransformer);
  }

  /**
   * Method used to log in a user.
   *
   * @param {Object} user
   *
   * @returns {Promise} The result in a promise.
   */
  login(user) {
    // in the future, we can use client_api and client_api_secret
    // user.client_id = process.env.API_CLIENT_ID;
    // user.client_secret = process.env.API_CLIENT_SECRET;
    // user.grant_type = 'password';
    // user.scope= '';
    return this.submit('post', `/${this.endpoint}/login`, this.transformer.send, user);
  }

  /**
   * Method used to log out a user.
   *
   * @param {Object} user
   *
   * @returns {Promise} The result in a promise.
   */
  logout(user) {
    return this.submit('post', `/${this.endpoint}/logout`, this.transformer.send, user);
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data);
  }
}

export default AuthProxy;

import Proxy from './Proxy';
import UserTransformer from '../transformers/UserTransformer';

class UserProxy extends Proxy {
  /**
   * The constructor for the UserProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('Users', parameters, UserTransformer);
  }

  /**
   * Method used to log in a user.
   *
   * @param {Object} user
   *
   * @returns {Promise} The result in a promise.
   */
  login(user) {
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
}

export default UserProxy;

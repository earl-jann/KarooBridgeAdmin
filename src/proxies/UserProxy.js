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
}

export default UserProxy;

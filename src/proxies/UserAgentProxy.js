import Proxy from './Proxy';
import UserAgentTransformer from '../transformers/UserAgentTransformer';

class UserAgentProxy extends Proxy {
  /**
   * The constructor for the UserAgentProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('useragent', parameters, UserAgentTransformer);
  }
}

export default UserAgentProxy;

import Proxy from './Proxy';
import FirewallTransformer from '../transformers/FirewallTransformer';

class FirewallProxy extends Proxy {
  /**
   * The constructor for the FirewallProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('firewall', parameters, FirewallTransformer);
  }
}

export default FirewallProxy;

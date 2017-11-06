import Proxy from './Proxy';
import FirewallRulesTransformer from '../transformers/FirewallRulesTransformer';

class FirewallRulesProxy extends Proxy {
  /**
   * The constructor for the FirewallRulesProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('firewallrules', parameters, FirewallRulesTransformer);
  }
}

export default FirewallRulesProxy;

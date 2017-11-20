import Proxy from './Proxy';
import GatewayProfileTransformer from '../transformers/GatewayProfileTransformer';

class GatewayProfileProxy extends Proxy {
  /**
   * The constructor for the GatewayProfileProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('gatewayprofiles', parameters, GatewayProfileTransformer);
  }
}

export default GatewayProfileProxy;

import Proxy from './Proxy';
import InterfaceTransformer from '../transformers/InterfaceTransformer';

class InterfaceProxy extends Proxy {
  /**
   * The constructor for the InterfaceProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('interfaces', parameters, InterfaceTransformer);
  }
}

export default InterfaceProxy;

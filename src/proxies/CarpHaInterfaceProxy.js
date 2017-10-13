import Proxy from './Proxy';
import CarpHaInterfaceTransformer from '../transformers/CarpHaInterfaceTransformer';

class CarpHaInterfaceProxy extends Proxy {
  /**
   * The constructor for the CarpHaInterfaceProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('carpha', parameters, CarpHaInterfaceTransformer);
  }
}

export default CarpHaInterfaceProxy;

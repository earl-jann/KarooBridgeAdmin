import Proxy from './Proxy';
import PortRangesTransformer from '../transformers/PortRangesTransformer';

class PortRangesProxy extends Proxy {
  /**
   * The constructor for the PortRangesProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('ports', parameters, PortRangesTransformer);
  }
}

export default PortRangesProxy;

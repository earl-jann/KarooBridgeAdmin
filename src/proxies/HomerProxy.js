import Proxy from './Proxy';
import HomerTransformer from '../transformers/HomerTransformer';

class HomerProxy extends Proxy {
  /**
   * The constructor for the HomerProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('homer', parameters, HomerTransformer);
  }
}

export default HomerProxy;

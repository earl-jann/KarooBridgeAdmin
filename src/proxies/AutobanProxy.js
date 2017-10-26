import Proxy from './Proxy';
import AutobanTransformer from '../transformers/AutobanTransformer';

class AutobanProxy extends Proxy {
  /**
   * The constructor for the AutobanProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('autoban', parameters, AutobanTransformer);
  }
}

export default AutobanProxy;

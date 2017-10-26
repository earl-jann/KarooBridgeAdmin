import Proxy from './Proxy';
import DomainLimitsTransformer from '../transformers/DomainLimitsTransformer';

class DomainLimitsProxy extends Proxy {
  /**
   * The constructor for the DomainLimitsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('domainlimits', parameters, DomainLimitsTransformer);
  }
}

export default DomainLimitsProxy;

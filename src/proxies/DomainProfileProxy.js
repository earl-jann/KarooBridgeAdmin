import Proxy from './Proxy';
import DomainProfileTransformer from '../transformers/DomainProfileTransformer';

class DomainProfileProxy extends Proxy {
  /**
   * The constructor for the DomainProfileProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('domainprofiles', parameters, DomainProfileTransformer);
  }
}

export default DomainProfileProxy;

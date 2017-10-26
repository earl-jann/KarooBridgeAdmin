import Proxy from './Proxy';
import TlsTransformer from '../transformers/TlsTransformer';

class TlsProxy extends Proxy {
  /**
   * The constructor for the TlsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('tls', parameters, TlsTransformer);
  }
}

export default TlsProxy;

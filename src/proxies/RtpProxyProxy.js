import Proxy from './Proxy';
import RtpProxyTransformer from '../transformers/RtpProxyTransformer';

class RtpProxyProxy extends Proxy {
  /**
   * The constructor for the RtpProxyProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('rtpproxy', parameters, RtpProxyTransformer);
  }
}

export default RtpProxyProxy;

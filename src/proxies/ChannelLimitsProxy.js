import Proxy from './Proxy';
import ChannelLimitsTransformer from '../transformers/ChannelLimitsTransformer';

class ChannelLimitsProxy extends Proxy {
  /**
   * The constructor for the ChannelLimitsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('channellimits', parameters, ChannelLimitsTransformer);
  }
}

export default ChannelLimitsProxy;

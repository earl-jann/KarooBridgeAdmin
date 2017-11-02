import Proxy from './Proxy';
import PacketRateWhitelistTransformer from '../transformers/PacketRateWhitelistTransformer';

class PacketRateWhitelistProxy extends Proxy {
  /**
   * The constructor for the PacketRateWhitelistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('packetratewhitelist', parameters, PacketRateWhitelistTransformer);
  }
}

export default PacketRateWhitelistProxy;

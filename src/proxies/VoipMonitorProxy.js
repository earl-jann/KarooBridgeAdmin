import Proxy from './Proxy';
import VoipMonitorTransformer from '../transformers/VoipMonitorTransformer';

class VoipMonitorProxy extends Proxy {
  /**
   * The constructor for the VoipMonitorProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('voipmonitor', parameters, VoipMonitorTransformer);
  }
}

export default VoipMonitorProxy;

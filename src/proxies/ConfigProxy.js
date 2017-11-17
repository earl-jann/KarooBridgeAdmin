import Proxy from './Proxy';
import ConfigTransformer from '../transformers/ConfigTransformer';

class ConfigProxy extends Proxy {
  /**
   * The constructor for the ConfigProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('config', parameters, ConfigTransformer);
  }

  /**
   * Method used to generate the config.
   *
   * @param {Object} data The data.
   *
   * @returns {Promise} The result in a promise.
   */
  generate(data) {
    return this.submit('post', `${this.endpoint}/generate`, this.transformer.send, data);
  }

}

export default ConfigProxy;

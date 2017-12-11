/* ::::::::::::
 * GatewayProfileTransformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class GatewayProfileTransformer extends Transformer {

  /**
   * Method used to transform a fetched object
   *
   * @param object The fetched object
   *
   * @returns {Object} The transformed object
   */
  static fetch(object) {
    return {
      id: object.id,
      gatewayName: object.gateway_name,
      description: object.description,
      properties: object.properties,
    };
  }

  /**
   * Method used to transform a send object
   *
   * @param object The object to be send
   *
   * @returns {Object} The transformed object
   */
  static send(object) {
    return {
      id: object.id,
      gateway_name: object.gatewayName,
      description: object.description,
      properties: object.properties,
    };
  }
}

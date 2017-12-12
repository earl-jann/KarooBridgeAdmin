/* ::::::::::::
 * DomainProfileTransformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class DomainProfileTransformer extends Transformer {

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
      domainName: object.domain_name,
      description: object.description,
      routes: object.routes,
      rules: object.rules,
      inbound: object.inbound,
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
      domain_name: object.domainName,
      description: object.description,
      routes: object.routes,
      rules: object.rules,
      inbound: object.inbound,
    };
  }
}

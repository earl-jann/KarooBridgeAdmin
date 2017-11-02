/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';
import Vue from 'vue';

export default class FirewallRulesTransformer extends Transformer {

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
      description: object.description,
      portBase: object.port_base,
      portMax: object.port_max,
      type: object.type,
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
      description: object.description,
      port_base: object.portBase,
      port_max: object.portMax,
      type: object.type,
    };
  }
}

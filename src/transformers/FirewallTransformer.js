/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the listener.
 */

import Transformer from './Transformer';
import Vue from 'vue';

export default class FirewallTransformer extends Transformer {

  /**
   * Method used to transform a fetched listener
   *
   * @param listener The fetched listener
   *
   * @returns {Object} The transformed listener
   */
  static fetch(listener) {
    return {
      id: listener.id,
      enabled: listener.enabled,
    };
  }

  /**
   * Method used to transform a send listener
   *
   * @param listener The listener to be send
   *
   * @returns {Object} The transformed listener
   */
  static send(listener) {
    return {
      id: listener.id,
      enabled: listener.enabled,
    };
  }
}

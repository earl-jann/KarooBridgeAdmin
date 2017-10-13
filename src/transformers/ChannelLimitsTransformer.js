/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';
import Vue from 'vue';

export default class ChannelLimitsTransformer extends Transformer {

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
      enabled: object.enabled,
      maxChannels: object.max_channels,
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
      enabled: object.enabled,
      max_channels: object.maxChannels,
    };
  }
}

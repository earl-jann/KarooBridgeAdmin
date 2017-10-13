/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';
import Vue from 'vue';

export default class AutobanTransformer extends Transformer {

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
      packetRateMinTreshold: object.packet_rate_min_treshold,
      packetRateMaxTreshold: object.packet_rate_max_treshold,
      packetRateTresholdBanDuration: object.packet_rate_treshold_ban_duration,
      packetRateWhiteList: object.packet_rate_white_list,
      executeOnBan: object.execute_on_ban,
      autoNullRouteOnBan: object.auto_null_route_on_ban,
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
      packet_rate_min_treshold: object.packetRateMinTreshold,
      packet_rate_max_treshold: object.packetRateMaxTreshold,
      packet_rate_treshold_ban_duration: object.packetRateTresholdBanDuration,
      packet_rate_white_list: object.packetRateWhiteList,
      execute_on_ban: object.executeOnBan,
      auto_null_route_on_ban: object.autoNullRouteOnBan,
    };
  }
}

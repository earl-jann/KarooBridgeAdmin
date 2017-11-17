/* ::::::::::::
 * Rtp Proxy Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class RtpProxyTransformer extends Transformer {

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
      rtpProxyReadTimeout: object.rtp_proxy_read_timeout,
      rtpProxyTransportThreadCount: object.rtp_proxy_transport_thread_count,
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
      rtp_proxy_read_timeout: object.rtpProxyReadTimeout,
      rtp_proxy_transport_thread_count: object.rtpProxyTransportThreadCount,
    };
  }
}

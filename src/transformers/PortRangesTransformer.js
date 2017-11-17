/* ::::::::::::
 * PortRangesTransformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class PortRangesTransformer extends Transformer {

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
      sipTcpPortBase: object.sip_tcp_port_base,
      sipTcpPortMax: object.sip_tcp_port_max,
      rtpProxyPortBase: object.rtp_proxy_port_base,
      rtpProxyPortMax: object.rtp_proxy_port_max,
      transcoderPortBase: object.transcoder_port_base,
      transcoderPortMax: object.transcoder_port_max,
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
      sip_tcp_port_base: object.sipTcpPortBase,
      sip_tcp_port_max: object.sipTcpPortMax,
      rtp_proxy_port_base: object.rtpProxyPortBase,
      rtp_proxy_port_max: object.rtpProxyPortMax,
      transcoder_port_base: object.transcoderPortBase,
      transcoder_port_max: object.transcoderPortMax,
    };
  }
}

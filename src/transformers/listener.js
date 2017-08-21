/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the listener.
 */

import Transformer from './transformer';

export default class ListenerTransformer extends Transformer {
  /**
   * Method used to transform a fetched listener
   *
   * @param listener The fetched listener
   *
   * @returns {Object} The transformed listener
   */
  static fetch(listener) {
    return {
      ipAddress: listener.ip_address,
      externalAddress: listener.external_address,
      tcpEnabled: listener.tcp_enabled,
      udpEnabled: listener.udp_enabled,
      wsEnabled: listener.ws_enabled,
      tlsEnabled: listener.tls_enabled,
      sipPort: listener.sip_port,
      tlsPort: listener.tls_port,
      wsPort: listener.ws_port,
      subnets: listener.subnets,
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
      ip_address: listener.ipAddress,
      external_address: listener.externalAddress,
      tcp_enabled: listener.tcpEnabled,
      udp_enabled: listener.udpEnabled,
      ws_enabled: listener.wsEnabled,
      tls_enabled: listener.tlsEnabled,
      sip_port: listener.sipPort,
      tls_port: listener.tlsPort,
      ws_port: listener.wsPort,
      subnets: listener.subnets,
    };
  }
}

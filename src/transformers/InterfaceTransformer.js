/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the listener.
 */

import Transformer from './Transformer';
import Vue from 'vue';

export default class InterfaceTransformer extends Transformer {

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
      name: listener.name,
      description: listener.description,
      ipAddress: listener.ip_address,
      externalAddress: listener.external_address,
      tcpEnabled: listener.tcp_enabled,
      udpEnabled: listener.udp_enabled,
      wsEnabled: listener.ws_enabled,
      tlsEnabled: listener.tls_enabled,
      wssEnabled: listener.wss_enabled,
      sipPort: listener.sip_port,
      tlsPort: listener.tls_port,
      wsPort: listener.ws_port,
      wssPort: listener.wss_port,
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
      id: listener.id,
      name: listener.name,
      description: listener.description,
      ip_address: listener.ipAddress,
      external_address: listener.externalAddress,
      tcp_enabled: listener.tcpEnabled,
      udp_enabled: listener.udpEnabled,
      ws_enabled: listener.wsEnabled,
      wss_enabled: listener.wssEnabled,
      tls_enabled: listener.tlsEnabled,
      sip_port: listener.sipPort,
      tls_port: listener.tlsPort,
      ws_port: listener.wsPort,
      wss_port: listener.wssPort,
      subnets: listener.subnets,
    };
  }
}

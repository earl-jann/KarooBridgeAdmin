/* ::::::::::::
 * CarpHaInterfaceTransformer
 * ::::::::::::
 *
 * The transformer for the listener.
 */

import Transformer from './Transformer';

export default class CarpHaInterfaceTransformer extends Transformer {

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
      virtualIpAddress: listener.virtual_ip_address,
      interfaceName: listener.interface_name,
      description: listener.description,
      sourceAddress: listener.src_address,
      upScript: listener.up_script,
      downScript: listener.down_script,
      carpPassword: listener.carp_password,
      vhid: listener.vhid,
      preferredMaster: listener.preferred_master,
      externalAddress: listener.external_address,
      tcpEnabled: listener.tcp_enabled,
      udpEnabled: listener.udp_enabled,
      wsEnabled: listener.ws_enabled,
      wssEnabled: listener.wss_enabled,
      tlsEnabled: listener.tls_enabled,
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
      enabled: listener.enabled,
      virtual_ip_address: listener.virtualIpAddress,
      interface_name: listener.interfaceName,
      description: listener.description,
      src_address: listener.sourceAddress,
      up_script: listener.upScript,
      down_script: listener.downScript,
      carp_password: listener.carpPassword,
      vhid: listener.vhid,
      preferred_master: listener.preferredMaster,
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

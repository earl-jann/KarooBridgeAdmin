/* ::::::::::::
 * Listener Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class UserAgentTransformer extends Transformer {

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
      userAgentName: object.user_agent_name,
      registerStateInContactParams: object.register_state_in_contact_params,
      dialogStateInContactParams: object.dialog_state_in_contact_params,
      enableOptionsRouting: object.enable_options_routing,
      disableOptionsKeepAlive: object.disable_options_keep_alive,
      requireRtpForRegistrations: object.require_rtp_for_registrations,
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
      user_agent_name: object.userAgentName,
      register_state_in_contact_params: object.registerStateInContactParams,
      dialog_state_in_contact_params: object.dialogStateInContactParams,
      enable_options_routing: object.enableOptionsRouting,
      disable_options_keep_alive: object.disableOptionsKeepAlive,
      require_rtp_for_registrations: object.requireRtpForRegistrations,
    };
  }
}

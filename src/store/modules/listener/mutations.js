/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * listener module.
 */

import { STORE } from './mutation-types';

export default {
  [STORE](state, listener) {
    state.ipAddress = listener.ipAddress;
    state.externalAddress = listener.externalAddress;
    state.tcpEnabled = listener.tcpEnabled;
    state.udpEnabled = listener.udpEnabled;
    state.wsEnabled = listener.wsEnabled;
    state.tlsEnabled = listener.tlsEnabled;
    state.sipPort = listener.sipPort;
    state.tlsPort = listener.tlsPort;
    state.wsPort = listener.wsPort;
    state.subnets = listener.subnets;
  },
};

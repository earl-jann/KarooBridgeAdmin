/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * listener module.
 */

import { FIND } from './mutation-types';

export default {
  [FIND](state, listener) {
    state.id = listener.id;
    state.name = listener.name;
    state.description = listener.description;
    state.ipAdddress = listener.ipAdddress;
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

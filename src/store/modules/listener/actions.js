/* ============
 * Actions for the listener module
 * ============
 *
 * The actions that are available on the
 * listener module.
 */

import * as types from './mutation-types';

export const store = ({ commit }, payload) => {
  commit(types.STORE, payload);
};

export default {
  store,
};

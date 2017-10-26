/* ============
 * Mutations for the user module
 * ============
 *
 * The mutations that are available on the
 * user module.
 */

import { FIND } from './mutation-types';

export default {
  [FIND](state, user) {
    state.userId = user.id;
    state.email = user.email;
    state.username = user.username;
    state.firstName = user.firstName;
    state.lastName = user.lastName;
  },
};

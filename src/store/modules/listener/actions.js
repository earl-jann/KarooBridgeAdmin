/* ============
 * Actions for the listener module
 * ============
 *
 * The actions that are available on the
 * listener module.
 */

import Transformer from '@/transformers/InterfaceTransformer';
import * as types from './mutation-types';

export const find = ({ commit }) => {
  /*
   * Normally you would use a proxy to fetch the listener:
   *
   * new Proxy()
   *  .find()
   *  .then((response) => {
   *    commit(types.FIND, Transformer.fetch(response));
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */
  const listener = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'jonh@doe.com',
  };

  commit(types.FIND, Transformer.fetch(listener));
};

export default {
  find,
};

/* ============
 * Actions for the listener module
 * ============
 *
 * The actions that are available on the
 * listener module.
 */

// import * as types from './mutation-types';

// export const store = ({ commit }, payload) => {
//   commit(types.STORE, payload);
// };

// export default {
//   store,
// };

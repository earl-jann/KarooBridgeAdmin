/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import Vue from 'vue';
import UserProxy from '@/proxies/UserProxy';
import UserTransformer from '@/transformers/UserTransformer';
import * as types from './mutation-types';

export const find = ({ commit }, userId) => {
  new UserProxy()
   .find(userId)
   .then((response) => {
     commit(types.FIND, UserTransformer.fetch(response));
   })
   .catch(() => {
     Vue.console.log('Request failed...');
   });
};

export default {
  find,
};

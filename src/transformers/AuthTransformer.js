/* ============
 * Auth Transformer
 * ============
 *
 * The transformer for the auth.
 */

import Transformer from './Transformer';

export default class AuthTransformer extends Transformer {
  /**
   * Method used to transform a fetched auth
   *
   * @param auth The fetched auth
   *
   * @returns {Object} The transformed auth
   */
  static fetch(auth) {
    return {
      id: auth.id,
      ttl: auth.ttl,
      created: auth.created,
      userId: auth.userId,
      username: auth.username,
      password: auth.password,
      email: auth.email,
      realm: auth.realm,
    };
  }
  /**
   * Method used to transform a send auth
   *
   * @param auth The auth to be send
   *
   * @returns {Object} The transformed auth
   */
  static send(auth) {
    return {
      id: auth.id,
      ttl: auth.ttl,
      created: auth.created,
      userId: auth.userId,
      username: auth.username,
      password: auth.password,
      email: auth.email,
      realm: auth.realm,
    };
  }
}

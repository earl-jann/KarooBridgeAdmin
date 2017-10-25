/* ============
 * User Transformer
 * ============
 *
 * The transformer for the user.
 */

import Transformer from './Transformer';

export default class UserTransformer extends Transformer {
  /**
   * Method used to transform a fetched user
   *
   * @param user The fetched user
   *
   * @returns {Object} The transformed user
   */
  static fetch(user) {
    return {
      id: user.id,
      userId: user.userId,
      realm: user.realm,
      username: user.username,
      password: user.password,
      email: user.email,
      status: user.status,
    };
  }
  /**
   * Method used to transform a send user
   *
   * @param user The user to be send
   *
   * @returns {Object} The transformed user
   */
  static send(user) {
    return {
      id: user.id,
      userId: user.userId,
      realm: user.realm,
      username: user.username,
      password: user.password,
      email: user.email,
      status: user.status,
    };
  }
}

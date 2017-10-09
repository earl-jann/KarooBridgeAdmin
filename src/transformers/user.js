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
      username: user.username,
      password: user.password,
      name: user.name,
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
      username: user.username,
      password: user.password,
      name: user.name,
    };
  }
}

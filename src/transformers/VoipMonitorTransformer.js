/* ::::::::::::
 * Homer Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class VoipMonitorTransformer extends Transformer {

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
      mySqlHost: object.mysqlhost,
      mySqlPort: object.mysqlport,
      mySqlUsername: object.mysqlusername,
      mySqlPassword: object.mysqlpassword,
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
      mysqlhost: object.mySqlHost,
      mysqlport: object.mySqlPort,
      mysqlusername: object.mySqlUsername,
      mysqlpassword: object.mySqlPassword,
    };
  }
}

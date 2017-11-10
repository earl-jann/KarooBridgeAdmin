/* ::::::::::::
 * Homer Transformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class HomerTransformer extends Transformer {

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
      homerEnabled: object.homer_enabled,
      homerVersion: object.homer_version,
      homerHost: object.homer_host,
      homerPort: object.homer_port,
      homerPassword: object.homer_password,
      homerCompression: object.homer_compression,
      homerId: object.homer_id,
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
      homer_enabled: object.homerEnabled,
      homer_version: object.homerVersion,
      homer_host: object.homerHost,
      homer_port: object.homerPort,
      homer_password: object.homerPassword,
      homer_compression: object.homerCompression,
      homer_id: object.homerId,
    };
  }
}

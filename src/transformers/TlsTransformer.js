/* ::::::::::::
 * TlsTransformer
 * ::::::::::::
 *
 * The transformer for the object.
 */

import Transformer from './Transformer';

export default class TlsTransformer extends Transformer {

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
      tlsCaFile: object.tls_ca_file,
      tlsCaPath: object.tls_ca_path,
      tlsCertificateFile: object.tls_certificate_file,
      tlsPrivateKeyFile: object.tls_private_key_file,
      tlsCertPassword: object.tls_cert_password,
      tlsVerifyPeer: object.tls_verify_peer,
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
      tls_ca_file: object.tlsCaFile,
      tls_ca_path: object.tlsCaPath,
      tls_certificate_file: object.tlsCertificateFile,
      tls_private_key_file: object.tlsPrivateKeyFile,
      tls_cert_password: object.tlsCertPassword,
      tls_verify_peer: object.tlsVerifyPeer,
    };
  }
}

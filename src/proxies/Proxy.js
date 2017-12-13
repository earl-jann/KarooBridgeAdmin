import Vue from 'vue';

class BaseProxy {
  /**
   * The constructor of the BaseProxy.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor(endpoint, parameters = {}, transformer) {
    this.endpoint = endpoint;
    this.parameters = parameters;
    this.transformer = transformer;
  }

  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  setParameters(parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[key] = parameters[key];
    });

    return this;
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  setParameter(parameter, value) {
    this.parameters[parameter] = value;

    return this;
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  removeParameters(parameters) {
    parameters.forEach((parameter) => {
      delete this.parameters[parameter];
    });

    return this;
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  removeParameter(parameter) {
    delete this.parameters[parameter];

    return this;
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      requestType The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   *
   * @returns {Promise} The result in a promise.
   */
  submit(requestType, url, transformerFunction = null, data = null) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (requestType !== 'get' && requestType !== 'delete') {
        // transform data
        data = transformerFunction.call(self.transformer, data);
      }

      Vue.$http[requestType](url + this.getParameterString(), data)
        .then((response) => {
          if (requestType === 'delete') {
            // don't transform data
            resolve(response.data);
          } else {
            const result = transformerFunction.call(self.transformer, response.data);
            resolve(result);
          }
        })
        .catch(({ response }) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  all() {
    return this.submit('get', `/${this.endpoint}`, this.transformer.fetchCollection);
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @param {filter} The given filter.
   * @returns {Promise} The result in a promise.
   */
  findAll() {
    return this.submit('get', `/${this.endpoint}`, this.transformer.fetchCollection);
  }

  /**
   * Method used to count items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  count() {
    return this.submit('get', `/${this.endpoint}/count`, this.transformer.fetchCount);
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  find(id) {
    return this.submit('get', `/${this.endpoint}/${id}`, this.transformer.fetch);
  }

  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create(item) {
    return this.submit('post', `/${this.endpoint}`, this.transformer.send, item);
  }

  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  update(id, item) {
    return this.submit('put', `/${this.endpoint}/${id}`, this.transformer.send, item);
  }

  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy(id) {
    return this.submit('delete', `/${this.endpoint}/${id}`);
  }

  /**
   * Method used to transform a parameters object to a parameters string.
   *
   * @returns {string} The parameter string.
   */
  getParameterString() {
    const keys = Object.keys(this.parameters);

    const parameterStrings = keys
      .filter(key => !!this.parameters[key])
      .map(key => `${key}=${this.parameters[key]}`);

    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`;
  }
}

export default BaseProxy;

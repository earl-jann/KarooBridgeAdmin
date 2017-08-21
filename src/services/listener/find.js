import listenerTransformer from './../../transformers/listener';
import store from './../../store';

// When the request succeeds
const success = (listener) => {
  listener = listenerTransformer.fetch(listener);

  store.dispatch('listener/store', listener);
};

// When the request fails
const failed = () => {
};

export default () => {
  /*
   * Normally you would perform an AJAX-request.
   * But to get the example working, the data is hardcoded.
   *
   * With the include REST-client Axios, you can do something like this:
   * Vue.$http.get('/listener')
   *   .then((response) => {
   *     success(response);
   *   })
   *   .catch((error) => {
   *     failed(error);
   *   });
   */
  const succeeds = true;

  if (succeeds) {
    success({
      ip_address: '192.56.22.3',
      external_address: '200.21.2.3',
      sip_port: 20000,
    });
  } else {
    failed();
  }
};

import Vue from 'vue';
import interfaceTransformer from './../../transformers/InterfaceTransformer';
import store from './../../store';

const prefix = 'services.listener.find.';

// When the request succeeds
const success = (listeners) => {
  Vue.console.debug(prefix + '.success:' + listeners);
  const storeListeners = interfaceTransformer.fetchCollection(listeners.data);
  Vue.console.debug(prefix + '.success:' + storeListeners);
  store.dispatch('listener/store', storeListeners);

  listeners.data = storeListeners;
  return listeners;
};

// When the request fails
const failed = (error) => {
  Vue.console.error(prefix + 'failed: ' + error);
};

export default (params) => {
  const base = process.env.API_LOCATION;
  const result = Vue.$http.get(`${base}/interfaces`, { params })
    .then((response) => {
      success(response);
      return response;
    })
    .catch((error) => {
      failed(error);
    });

  return result;
};

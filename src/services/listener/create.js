import Vue from 'vue';
import listenerTransformer from './../../transformers/listener';
import store from './../../store';

// When the request succeeds
const success = (listener) => {
  store.dispatch('listener/store', listener);
  // redirect?
  // Vue.router.push({
  //   name: 'home.index',
  // });
};

const prefix = 'services.listener.find.';

// When the request succeeds
const success = (listeners) => {
  Vue.console.debug(prefix + '.success:' + listeners);
  const storeListeners = listenerTransformer.fetchCollection(listeners.data);
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
  const result = Vue.$http.post(`${base}/interfaces`, { params })
    .then((response) => {
      success(response);
      return response;
    })
    .catch((error) => {
      failed(error);
    });

  return result;
};

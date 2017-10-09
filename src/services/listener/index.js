import axios from 'axios';
import Vue from 'vue';
import find from './find';

const base = process.env.API_LOCATION;

const getListenerList = (params) => {
  const result = (axios.get(`${base}/interfaces`, { params }));
  return result;
};

const getListenerListPage = (params) => {
  const result = (axios.get(`${base}/interfaces`, { params }));
  return result;
};

const removeListener = (params) => {
  const id = params.id;
  const result = (axios.delete(`${base}/interfaces/` + id, { params }));
  return result;
};

const batchRemoveListener = (params) => {
  // TODO
  const result = (axios.get(`${base}/listener/batchremove`, { params }));
  return result;
};

const editListener = (params) => {
  Vue.console.debug('params: ' + params);
  if (params.id) {
    Vue.console.debug('params.id: ' + params.id + ', description: ' + params.description);
  }
  const id = params.id;
  const url = `${base}/interfaces/`;
  const result = (axios.put(url + id, { params }));
  return result;
};

const addListener = (params) => {
  Vue.console.debug('params: ' + params);
  if (params.id) {
    Vue.console.debug('params.id: ' + params.id + ', description: ' + params.description);
  }
  const result = (axios.post(`${base}/interfaces`, params));
  return result;
};

export default {
  addListener,
  editListener,
  batchRemoveListener,
  removeListener,
  getListenerListPage,
  getListenerList,
  find,
};

// import find from './find';
// import api from './api';

// import axios from 'axios';

// // export default {
// //   find,
// //   api,
// // };


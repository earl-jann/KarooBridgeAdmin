// import find from './find';
// import api from './api';

import axios from 'axios';

const base = process.env.API_LOCATION;

export const requestLogin = (params) => {
  const result = (axios.post(`${base}/login`, params).then(res => res.data));
  return result;
};

export const getListenerList = (params) => {
  const result = (axios.get(`${base}/listener/list`, { params }));
  return result;
};

export const getListenerListPage = (params) => {
  const result = (axios.get(`${base}/listener/listpage`, { params }));
  return result;
};

export const removeListener = (params) => {
  const result = (axios.get(`${base}/listener/remove`, { params }));
  return result;
};

export const batchRemoveListener = (params) => {
  const result = (axios.get(`${base}/listener/batchremove`, { params }));
  return result;
};

export const editListener = (params) => {
  const result = (axios.get(`${base}/listener/edit`, { params }));
  return result;
};

export const addListener = (params) => {
  const result = (axios.get(`${base}/listener/add`, { params }));
  return result;
};


// export default {
//   find,
//   api,
// };


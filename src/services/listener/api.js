import axios from 'axios';

const base = process.env.API_LOCATION;

const getListenerList = (params) => {
  const result = (axios.get(`${base}/listener/list`, { params }));
  return result;
};

const getListenerListPage = (params) => {
  const result = (axios.get(`${base}/listener/listpage`, { params }));
  return result;
};

const removeListener = (params) => {
  const result = (axios.get(`${base}/listener/remove`, { params }));
  return result;
};

const batchRemoveListener = (params) => {
  const result = (axios.get(`${base}/listener/batchremove`, { params }));
  return result;
};

const editListener = (params) => {
  const result = (axios.get(`${base}/listener/edit`, { params }));
  return result;
};

const addListener = (params) => {
  const result = (axios.get(`${base}/listener/add`, { params }));
  return result;
};

export default {
  addListener,
  editListener,
  batchRemoveListener,
  removeListener,
  getListenerListPage,
  getListenerList,
};

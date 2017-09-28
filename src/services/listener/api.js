import axios from 'axios';

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
  const id = params.id;
  const result = (axios.put(`${base}/interfaces` + id, { params }));
  return result;
};

const addListener = (params) => {
  const result = (axios.post(`${base}/interfaces`, { params }));
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

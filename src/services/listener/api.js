import axios from 'axios';

const base = '';

export const getListenerList = (params) => {
  (axios.get(`${base}/listener/list`, { params }));
};

export const getListenerListPage = (params) => {
  (axios.get(`${base}/listener/listpage`, { params }));
};

export const removeListener = (params) => {
  (axios.get(`${base}/listener/remove`, { params }));
};

export const batchRemoveListener = (params) => {
  (axios.get(`${base}/listener/batchremove`, { params }));
};

export const editListener = (params) => {
  (axios.get(`${base}/listener/edit`, { params }));
};

export const addListener = (params) => {
  (axios.get(`${base}/listener/add`, { params }));
};

// import find from './find';
// import api from './api';

// export default {
//   find,
//   api,
// };

import axios from 'axios';

const base = '';

const requestLogin = (params) => {
  (axios.post(`${base}/login`, params).then(res => res.data));
};

export const getUserList = (params) => {
  (axios.get(`${base}/user/list`, { params }));
};

export const getUserListPage = (params) => {
  const result = axios.get(`${base}/user/listpage`, { params });
  return result;
};

export const removeUser = (params) => {
  (axios.get(`${base}/user/remove`, { params }));
};

export const batchRemoveUser = (params) => {
  (axios.get(`${base}/user/batchremove`, { params }));
};

export const editUser = (params) => {
  (axios.get(`${base}/user/edit`, { params }));
};

export const addUser = (params) => {
  (axios.get(`${base}/user/add`, { params }));
};

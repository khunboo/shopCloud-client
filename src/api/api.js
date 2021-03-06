import axios from 'axios';

let base = 'http://localhost:9300/shop/admin';

export const requestLogin = params => {
  return axios.get(`${base}/user/login`, {
    params: params
  });
};

export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, {
    params: params
  });
};

export const removeUser = params => {
  return axios.get(`${base}/user/remove`, {
    params: params
  });
};

export const batchRemoveUser = params => {
  return axios.get(`${base}/user/batchremove`, {
    params: params
  });
};

export const editUser = params => {
  return axios.get(`${base}/user/edit`, {
    params: params
  });
};

export const addUser = params => {
  return axios.get(`${base}/user/add`, {
    params: params
  });
};

export const addName = params => {
  return axios.post(`${base}/workhours/save`, params);
};

export const getSelectByNameList = params => {
    return axios.get(`${base}/workhours/list`, {
      params: params
    });
};

export const delName = params => {
    return axios.get(`${base}/workhours/delName`, {
        params: params
    });
};

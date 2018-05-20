import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };
const baseURL = 'http://192.168.0.34:2082';
const api = axios.create({ baseURL, headers, timeout: 200000 });
api.interceptors.response.use(
  response => response.data,
  err => Promise.reject(err.response.data),
);

module.exports = api;

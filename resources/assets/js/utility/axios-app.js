import axios from 'axios';
import store from '../store/index';


//axios BaseURL to App URL  - Axios BaseURL zu App URL
const instance = new axios.create({
   baseURL: process.env.MIX_APP_URL,
   headers: {
       'Access-Control-Allow-Origin':	'*',
   },
});


// request interceptor  (loading status)
instance.interceptors.request.use((config) => {
  store.commit('LoadingStart');
  return config;
}, function (error) {
  store.commit('LoadingEnd');
  return Promise.reject(error);
});
//response interceptor
instance.interceptors.response.use((response) => {
  store.commit('LoadingEnd');
  return response;
}, function (error) {
  store.commit('setErrors',error.response.data);
  store.commit('LoadingEnd');
  return Promise.reject(error);
});


export default instance;


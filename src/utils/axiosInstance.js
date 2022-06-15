import axios from 'axios';
import {BASE_URL2} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadDataFromStorage} from '../utils/asyncStorage';

let headers = {};
const axiosInstance = axios.create({baseURL: `${BASE_URL2}`, headers});

axiosInstance.interceptors.request.use(
 (config) => {
    loadDataFromStorage('user_token').then((res) => {
      // console.log('CONFIG BEFORE', config);   
      // console.log(res,'AXIOS RES')
      config.headers.Authorization = `Bearer ${res}`;
      // console.log(res, 'AXIOS RES');
      console.log('CONFIG AFTER', config);
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (config) => {
    console.log(config,'CONFIG DATA');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

import axios, {AxiosInstance} from 'axios';

const SERVER_URL = 'http://192.168.5.206:3001';

const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const endpoints = {
  POST_EQUIPMENT: '/equipment',
  GET_EQUIPMENT: '/equipment',
};

export {api, endpoints};

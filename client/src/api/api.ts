import axios, {AxiosInstance} from 'axios';
import 'dotenv/config';

const {SERVER_URL} = process.env;

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

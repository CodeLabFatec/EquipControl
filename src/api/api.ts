import axios, {AxiosInstance} from 'axios';
import {SERVER_URL} from './config';

const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const endpoints = {
  //GET
  GET_EQUIPMENT: '/equipment/get',

  //POST
  POST_EQUIPMENT: '/equipment/create',

  //PATCH
  PATCH_EQUIPMENT_STATUS: '/equipment/updateStatus/',
  PATCH_EQUIPMENT_UPDATE: '/equipment/update/',
};

export {api, endpoints};

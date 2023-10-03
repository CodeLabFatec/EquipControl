import axios, {AxiosInstance} from 'axios';
import {SERVER_URL} from './config';

const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const endpoints = {
  //GET
  GET_EQUIPMENT: '/equipment/get',
  GET_USER: '/user/get/',
  GET_ALL_USERS: '/user/getAllUsers',
  VALIDATE_TOKEN: '/user/validate',

  //POST
  POST_EQUIPMENT: '/equipment/create',
  POST_USER: '/user/register',
  LOGIN_USER: '/user/login',

  //PATCH
  PATCH_EQUIPMENT_STATUS: '/equipment/updateStatus/',
  PATCH_EQUIPMENT_UPDATE: '/equipment/update/',
  PATCH_USER_UPDATE: '/user/update/',

  //DELETE
  DELETE_USER: '/user/delete/',
  DELETE_EQUIPMENT: '/equipment/delete/',
};

export {api, endpoints};

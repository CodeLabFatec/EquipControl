import axios, {AxiosInstance} from 'axios';
import {SERVER_URL} from './config';

const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

function setAuthorization(token: string | null) {
  if (token) {
    api.defaults.withCredentials = true;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers.common = {Authorization: `Bearer ${token}`};
  } else {
    api.defaults.withCredentials = false;
    api.defaults.headers.Authorization = null;
    api.defaults.headers.common = {Authorization: ``};
  }
}

const endpoints = {
  //GET
  GET_EQUIPMENT: '/equipment/get',
  GET_USER: '/user/get/',
  GET_ALL_USERS: '/user/getAllUsers',
  GET_DOMAIN: '/domain/get/',
  GET_ALL_DOMAINS: '/domain/getAllDomains',
  VALIDATE_TOKEN: '/auth/validate',
  VALIDATE_BIOMETRIC_TOKEN: '/auth/validateBiometric/',

  //POST
  POST_EQUIPMENT: '/equipment/create',
  POST_DOMAIN: '/domain/registerDomain',
  POST_USER: '/user/register',
  LOGIN_USER: '/auth/login',
  GENERTE_BIOMETRIC_TOKEN: '/user/generateBiometricToken',
  POST_SEND_RECOVER_CODE: '/auth/sendRecoverPasswordCode/',
  POST_RECOVER_PASSWORD: '/auth/recoverPassword/',
  POST_UPDATE_PASSWORD: '/user/changePassword/',

  //PATCH
  PATCH_EQUIPMENT_STATUS: '/equipment/updateStatus/',
  PATCH_EQUIPMENT_UPDATE: '/equipment/update/',
  PATCH_DOMAIN_UPDATE: '/domain/update/',
  PATCH_USER_UPDATE: '/user/update/',

  //DELETE
  DELETE_USER: '/user/delete/',
  DELETE_EQUIPMENT: '/equipment/delete/',
  DELETE_DOMAIN: '/domain/delete/',
};

export {api, endpoints, setAuthorization};

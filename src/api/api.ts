import axios, {AxiosInstance} from 'axios';

const SERVER_URL = 'http://192.168.131.44:3000';

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
  POST_EQUIPMENT: '/equipment',

  //PATCH
  PATCH_EQUIPMENT_STATUS: 'equipment/updateStatus',
};

export {api, endpoints};

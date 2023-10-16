import {Files} from './files';

export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  registration: string;
  cpf: string;
  isAdmin?: boolean;
  image?: Files;
  createdAt?: Date;
  updatedAt?: Date;
}

import {User} from '@/helpers/models';
import {api, endpoints} from '../api';
import {BaseController} from './BaseController';

interface SignInResponse {
  token: string;
  user: User;
}

class UserController extends BaseController<User> {
  constructor() {
    super('Usuário');
  }

  public login = async (
    username: string,
    password: string,
  ): Promise<SignInResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          token: '11111111111111111',
          user: {
            _id: 'a',
            cpf: 'a',
            email: 'a',
            lastName: 'b',
            name: 'a',
            phone: 'a',
            registration: 'a',
            username: 'a',
          },
        });
      }, 1000);
    });
  };

  async get(id: string): Promise<User | null> {
    try {
      return (await api.delete(endpoints.GET_USER + id)).data.user;
    } catch (e) {
      return null;
    }
  }
  async delete(id: string): Promise<any> {
    try {
      return (await api.delete(endpoints.DELETE_USER + id)).data;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  }

  public list = async (): Promise<User[]> => {
    try {
      return (await api.get(endpoints.GET_ALL_USERS)).data.users;
    } catch (e) {
      return [];
    }
  };

  public post = async (data: User) => {
    try {
      const {_id, ...eq} = data;
      const result = (await api.post(endpoints.POST_USER, eq)).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };

  public update = async (userId: string, data: User) => {
    const {_id, ...eq} = data;
    try {
      const result = (await api.patch(endpoints.PATCH_USER_UPDATE + userId, eq))
        .data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };
}

const userController = new UserController();

export default userController;

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
  ): Promise<SignInResponse | any> => {
    try {
      const data = {username, password};
      const result = (await api.post(endpoints.LOGIN_USER, data)).data;

      return result;
    } catch (e) {
      if (e.message.includes('401'))
        return {
          errorMessage: 'Usuário ou senha incorreto(a).',
        };

      return this.handleErrors(e.message);
    }
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
      const {_id, createdAt, updatedAt, ...user} = data;
      const result = (await api.post(endpoints.POST_USER, user)).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.response.data.message);
    }
  };

  public update = async (userId: string, data: User) => {
    const {_id, createdAt, updatedAt, ...user} = data;
    try {
      const result = (
        await api.patch(endpoints.PATCH_USER_UPDATE + userId, user)
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };

  public generateBiometricToken = async (data: {
    userId: string;
    active: boolean;
  }): Promise<SignInResponse | any> => {
    try {
      const result = await api.post(endpoints.GENERTE_BIOMETRIC_TOKEN, data);

      return result.data;
    } catch (e) {
      if (e.message.includes('404'))
        return {
          errorMessage: 'Usuário não encontrado.',
        };

      return this.handleErrors(e.message);
    }
  };

  public validateBiometricToken = async (
    biometricToken: string,
    biometricSecret: string,
  ): Promise<any> => {
    try {
      const res = await api.get(
        endpoints.VALIDATE_BIOMETRIC_TOKEN + biometricSecret,
        {
          headers: {
            authorization: biometricToken,
          },
        },
      );

      return res.data.jwt;
    } catch (e) {
      if (e.message.includes('401'))
        return {
          errorMessage: 'Usuário não autenticado.',
        };

      return this.handleErrors(e.message);
    }
  };

  public sendRecoverCode = async (username: string) => {
    try {
      const result = (
        await api.post(endpoints.POST_SEND_RECOVER_CODE + username)
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.response.data.message);
    }
  };

  public recoverPassword = async (
    username: string,
    password: string,
    code: string,
  ) => {
    try {
      const result = (
        await api.post(endpoints.POST_RECOVER_PASSWORD + username, {
          password,
          code,
        })
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.response.data.message);
    }
  };

  public updatePassword = async (
    _id: string,
    password: string,
    newPassword: string,
  ) => {
    try {
      const result = (
        await api.post(endpoints.POST_UPDATE_PASSWORD + _id, {
          password,
          newPassword,
        })
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.response.data.message);
    }
  };
}

const userController = new UserController();

export default userController;

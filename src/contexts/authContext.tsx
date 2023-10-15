import React, {createContext, useContext, useState} from 'react';
import {User} from '../helpers/models';
import {userController} from '../services';
import {alertError} from '../helpers/utils';
import LoadContext from './loadContext';

interface AuthContextData {
  signed: boolean;
  token: string | null;
  user: User | null;
  updateUser: (user: User) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  validateBiometricToken: (
    biometricToken: string,
    biometricSecret: string,
  ) => Promise<{
    auth: Boolean;
    user?: {
      userId: string;
      username: string;
      password: string;
    };
  }>;
  setBiometricOptions: (userId: string, active: boolean) => Promise<any>;
}

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: Props) => {
  const {isLoading, setLoading} = useContext(LoadContext);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function setBiometricOptions(userId: string, active: boolean) {
    const result = await userController.generateBiometricToken({
      userId,
      active,
    });

    if (result.errorMessage) {
      alertError(result.errorMessage);
      return;
    }

    return result;
  }

  async function validateBiometricToken(
    biometricToken: string,
    biometricSecret: string,
  ) {
    const result = await userController.validateBiometricToken(
      biometricToken,
      biometricSecret,
    );

    if (result.errorMessage) {
      alertError(result.errorMessage);
      return {
        auth: false,
      };
    }

    return {
      auth: true,
      user: {
        userId: result.userId,
        username: result.username,
        password: result.password,
      },
    };
  }

  async function login(username: string, password: string) {
    const result = await userController.login(username, password);

    setLoading(false);
    if (result.errorMessage) {
      alertError(result.errorMessage);
      return;
    }

    const {user, token} = result;

    setUser(user);
    setToken(token);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        token,
        user,
        login,
        logout,
        updateUser: setUser,
        setBiometricOptions,
        validateBiometricToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

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
}

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: Props) => {
  const {isLoading, setLoading} = useContext(LoadContext);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
      value={{signed: !!user, token, user, login, logout, updateUser: setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, {createContext, useState} from 'react';
import {User} from '../helpers/models';
import {userController} from '../services';

interface AuthContextData {
  signed: boolean;
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function login(username: string, password: string) {
    const {token, user} = await userController.login(username, password);

    setUser(user);
    setToken(token);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{signed: !!user, token, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

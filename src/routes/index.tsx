import React, {useContext} from 'react';
import {AuthContext} from '../contexts';
import AppRoutes from './appRoutes';
import AuthRoutes from './authRoutes';

const Routes: React.FC = () => {
  const {signed} = useContext(AuthContext);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

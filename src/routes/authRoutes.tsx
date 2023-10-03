import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../modules/pages/login';
import RecoverPassword from '../modules/pages/recoverPassword';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      navigationKey="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="RecoverPassword"
      navigationKey="RecoverPassword"
      component={RecoverPassword}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;

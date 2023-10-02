import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Test from '../modules/pages/test';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={Test} />
  </AuthStack.Navigator>
);

export default AuthRoutes;

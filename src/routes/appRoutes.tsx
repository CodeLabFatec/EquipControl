import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../modules/pages/home';
import Header from '../modules/components/header';
import EquipmentRegister from '../modules/pages/equipmentRegister';
import EquipmentInfo from '../modules/pages/equipmentInfo';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Home"
      navigationKey="Home"
      component={Home}
      options={{header: Header}}
    />
    <AppStack.Screen
      name="RegisterEquipment"
      navigationKey="RegisterEquipment"
      component={EquipmentRegister}
      options={{header: Header}}
    />
    <AppStack.Screen
      name="InfoEquipment"
      navigationKey="InfoEquipment"
      component={EquipmentInfo}
      options={{header: Header}}
    />
  </AppStack.Navigator>
);

export default AppRoutes;

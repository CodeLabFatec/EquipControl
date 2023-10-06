import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../modules/pages/home';
import Header from '../modules/components/header';
import EquipmentRegister from '../modules/pages/equipmentRegister';
import EquipmentInfo from '../modules/pages/equipmentInfo';
import {StyleSheet, View} from 'react-native';
import Footer from '../modules/components/footer';
import UserPage from '../modules/pages/user';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <>
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
      <AppStack.Screen
        name="User"
        navigationKey="User"
        component={UserPage}
        options={{header: Header}}
      />
    </AppStack.Navigator>
    <View style={styles.footer}>
      <Footer />
    </View>
  </>
);

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#111111',
    position: 'absolute',
    bottom: 0,
  },
});

export default AppRoutes;

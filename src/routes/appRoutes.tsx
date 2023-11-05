import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../modules/pages/home/home';
import Header from '../modules/components/header';
import EquipmentRegister from '../modules/pages/equipment/equipmentRegister';
import DomainRegister from '../modules/pages/domain/domainRegister';
import EquipmentInfo from '../modules/pages/equipment/equipmentInfo';
import EquipmentHistoric from '../modules/pages/equipment/equipmentHistoric';
import DomainInfo from '../modules/pages/domain/domainInfo';
import DomainList from '../modules/pages/domain/domainList';
import {StyleSheet, View} from 'react-native';
import Footer from '../modules/components/footer';
import ProfilePage from '../modules/pages/profile/profile';
import ListUsers from '../modules/pages/users/listUsers';
import RegisterUser from '../modules/pages/users/registerUser';
import UserInfo from '../modules/pages/users/userInfo';
import {AuthContext} from '../contexts';
import EditPassword from '../modules/pages/users/editPassword';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  const {user} = useContext(AuthContext);

  return (
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
          name="HistoricEquipment"
          navigationKey="HistoricEquipment"
          component={EquipmentHistoric}
          options={{header: Header}}
        />
        <AppStack.Screen
          name="Profile"
          navigationKey="Profile"
          component={ProfilePage}
          options={{header: Header}}
        />
        {user && user.isAdmin && (
          <>
            <AppStack.Screen
              name="RegisterDomain"
              navigationKey="RegisterDomain"
              component={DomainRegister}
              options={{header: Header}}
            />
            <AppStack.Screen
              name="InfoDomain"
              navigationKey="InfoDomain"
              component={DomainInfo}
              options={{header: Header}}
            />
            <AppStack.Screen
              name="ListDomain"
              navigationKey="ListDomain"
              component={DomainList}
              options={{header: Header}}
            />
            <AppStack.Screen
              name="RegisterUser"
              navigationKey="RegisterUser"
              component={RegisterUser}
              options={{header: Header}}
            />
            <AppStack.Screen
              name="UsuarioInfo"
              navigationKey="UsuarioInfo"
              component={UserInfo}
              options={{header: Header}}
            />
            <AppStack.Screen
              name="ListUsers"
              navigationKey="ListUsers"
              component={ListUsers}
              options={{header: Header}}
            />
            <AppStack.Screen
              name="EditPassword"
              navigationKey="EditPassword"
              component={EditPassword}
              options={{header: Header}}
            />
          </>
        )}
      </AppStack.Navigator>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#111111',
    position: 'absolute',
    bottom: 0,
  },
});

export default AppRoutes;

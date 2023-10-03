import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import EquipmentRegister from './modules/pages/equipmentRegister';
import Header from './modules/components/header';
import Home from './modules/pages/home';
import {navigationRef} from './RootNavigation';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import Footer from './modules/components/footer';
import EquipmentInfo from './modules/pages/equipmentInfo';
import Login from './modules/pages/login';
import RecoverPassword from './modules/pages/recoverPassword';

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#111111',
  },
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#111111'} />
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        <Stack.Navigator initialRouteName="RecoverPassword">
          <Stack.Screen
            name="Home"
            navigationKey="Home"
            component={Home}
            options={{header: Header}}
          />
          <Stack.Screen
            name="RegisterEquipment"
            navigationKey="RegisterEquipment"
            component={EquipmentRegister}
            options={{header: Header}}
          />
          <Stack.Screen
            name="InfoEquipment"
            navigationKey="InfoEquipment"
            component={EquipmentInfo}
            options={{header: Header}}
          />
          <Stack.Screen
            name="Login"
            navigationKey="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RecoverPassword"
            navigationKey="RecoverPassword"
            component={RecoverPassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <View style={styles.footer}>
          <Footer />
        </View>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  footer: {
    width: '100%',
    backgroundColor:  '#111111',
    position: 'absolute',
    bottom: 0,
  },
});
export default App;

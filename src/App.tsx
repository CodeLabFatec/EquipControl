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

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.darker,
  },
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.darker} />
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
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
    backgroundColor: Colors.darker,
  },
  footer: {
    width: '100%',
    backgroundColor: Colors.darker,
    position: 'absolute',
    bottom: 0,
  },
});
export default App;

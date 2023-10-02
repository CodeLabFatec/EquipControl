import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import Footer from './modules/components/footer';
import Routes from './routes';
import {AuthProvider} from './contexts/authContext';

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
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#111111'} />
        <NavigationContainer theme={MyTheme} ref={navigationRef}>
          <Routes />
          <View style={styles.footer}>
            <Footer />
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  footer: {
    width: '100%',
    backgroundColor: '#111111',
    position: 'absolute',
    bottom: 0,
  },
});
export default App;

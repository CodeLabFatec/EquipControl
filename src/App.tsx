import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import Footer from './modules/components/footer';
import Routes from './routes';
import {AuthProvider} from './contexts/authContext';
import {LoadProvider} from './contexts/loadContext';

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#111111',
  },
};

function App() {
  return (
    <LoadProvider>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#111111'} />
          <NavigationContainer theme={MyTheme} ref={navigationRef}>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </LoadProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});
export default App;

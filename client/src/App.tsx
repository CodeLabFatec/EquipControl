import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './modules/components/header';
import Footer from './modules/components/footer';

function App(): JSX.Element {
  return (
    <SafeAreaView style={Colors.darker}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.darker} />
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={Colors.darker}></ScrollView>
      <View>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;

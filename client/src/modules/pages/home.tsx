import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/header';
import Footer from '../components/footer';

function Home({navigation}): JSX.Element {
  console.table(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.darker} />
      <Header />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Teste</Text>
      </ScrollView>
      <View>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darker,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Home;

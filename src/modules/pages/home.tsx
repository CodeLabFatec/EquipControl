import React, {useEffect, useState} from 'react';
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
import {equipmentController} from '../../api';

function Home({navigation}) {
  const [data, setData] = useState();

  const loadData = async () => {
    const response = await equipmentController.test();

    console.log(response);
    if (response && response.data) setData(response.data);
  };

  useEffect(() => {
    loadData();
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.darker} />
      <Header />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Teste - {data}</Text>
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

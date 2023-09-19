import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchEquipment from '../components/search-equipment';
import { equipmentController } from '../../api';
import { Equipment } from '../../helpers/models';

function EquipmentRegister({navigation}) {
  const [equipments] = useState<Equipment[]>(equipmentController.list());
  const [filter, setFilter] = useState('');

  const filteredEquipments = equipments.filter(equipment =>
    equipment.name?.includes(filter),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchEquipment
        value={filter}
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      <View style={styles.footer}>
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
    width: '100%',
    backgroundColor: Colors.darker,
    position: 'absolute',
    bottom: 0,
  },
});

export default EquipmentRegister;

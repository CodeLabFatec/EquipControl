import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/header';
import Footer from '../components/footer';
import EquipmentComponent from '../components/equipment';
import {Equipment} from '../../helpers/models';
import {equipmentController} from '../../api';
import SearchEquipment from '../components/search-equipment';

function Home({navigation}) {
  const [equipments] = useState<Equipment[]>(equipmentController.list());
  const [filter, setFilter] = useState('');

  const filteredEquipments = equipments.filter(equipment =>
    equipment.name?.includes(filter),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.darker} />
      <Header />
      <View>
        <SearchEquipment
          value={filter}
          onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
        />
        <FlatList
          data={filteredEquipments}
          renderItem={EquipmentComponent}
          numColumns={2}
          contentContainerStyle={styles.equipmentList}
          keyExtractor={item => item._id ?? ''}
        />
      </View>
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
  equipmentList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 120,
  },
});

export default Home;

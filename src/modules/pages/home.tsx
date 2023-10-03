import React, {useContext, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {LoadContext} from '../../contexts';
import EquipmentComponent from '../components/equipment-item';
import {Equipment} from '../../helpers/models';
import {equipmentController} from '../../services';
import SearchEquipment from '../components/search-equipment';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

function Home({navigation}) {
  const {isLoading, setLoading} = useContext(LoadContext);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [filter, setFilter] = useState('');

  async function load() {
    const data = await equipmentController.list();
    setEquipments(data);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      load();
    }, []),
  );

  const filteredEquipments = equipments?.filter(equipment =>
    equipment.name?.includes(filter),
  );

  return (
    <View>
      <SearchEquipment
        value={filter}
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#77A490" />
      ) : (
        <FlatList
          data={filteredEquipments}
          renderItem={EquipmentComponent}
          numColumns={2}
          contentContainerStyle={styles.equipmentList}
          keyExtractor={item => item._id ?? ''}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  equipmentList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 175,
  },
});

export default Home;

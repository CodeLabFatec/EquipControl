import React, {useContext, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {LoadContext} from '../../../contexts';
import EquipmentComponent from '../../components/equipment/equipment-item';
import {Equipment} from '../../../helpers/models';
import {equipmentController} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../components/base/search-bar';

function Home() {
  const {setLoading} = useContext(LoadContext);
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

  const filteredEquipments = equipments.filter(
    equipment =>
      equipment.name.toLowerCase().includes(filter.toLowerCase()) ||
      (equipment.created_by &&
        equipment.created_by.name
          .toLowerCase()
          .includes(filter.toLowerCase())) ||
      equipment.domain.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <View>
      <SearchBar
        value={filter}
        newItemPage="RegisterEquipment"
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      <FlatList
        data={filteredEquipments}
        renderItem={EquipmentComponent}
        numColumns={1}
        contentContainerStyle={styles.equipmentList}
        keyExtractor={item => item._id ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  equipmentList: {
    paddingBottom: 120,
  },
});

export default Home;

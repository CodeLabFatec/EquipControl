import React, {useContext, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {LoadContext} from '../../../contexts';
import { Equipment } from '../../../helpers/models';
import { equipmentController } from '../../../services';
import EquipmentComponent from '../../components/equipment/equipment-historic';

import SearchEquipment from '../../components/equipment/search-equipment';
import {useFocusEffect} from '@react-navigation/native';

function EquipmentHistoric({navigation}) {
  const {setLoading} = useContext(LoadContext);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filter, setFilter] = useState('');



  async function load() {
    const data = await equipmentController.list();
    setEquipment(data);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      load();
    }, []),
  );

  const filteredEquipment = equipment?.filter(equipment =>
    equipment.name?.includes(filter),
  );

  return (
    <View>
      <SearchEquipment
        value={filter}
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      <FlatList
        data={filteredEquipment}
        renderItem={EquipmentComponent}
        numColumns={4}
        contentContainerStyle={styles.domainList}
        keyExtractor={item => item.name ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  domainList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 175,
  },
});

export default EquipmentHistoric;

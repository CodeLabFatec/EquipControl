import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {Equipment} from '../../../helpers/models';
import EquipmentHistoryComponent from '../../components/equipment/equipment-historic';

function EquipmentHistoric({navigation, route}) {
  const equipment: Equipment = route.params;
  if (!equipment) {
    navigation.navigate('Home');
    return;
  }

  return (
    <View>
      {!equipment.history ||
        (equipment.history.length === 0 && (
          <Text style={styles.none}>Nenhuma manobra realizada</Text>
        ))}
      <FlatList
        data={equipment.history ? equipment.history : []}
        renderItem={EquipmentHistoryComponent}
        numColumns={1}
        contentContainerStyle={styles.historyList}
        keyExtractor={item => item.date ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  historyList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 175,
  },
  none: {
    padding: 20,
    textAlign: 'center',
  },
});

export default EquipmentHistoric;

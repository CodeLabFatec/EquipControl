import React from 'react';
import {StyleSheet, Text, View, ListRenderItem} from 'react-native';
import {EquipmentHistory} from '../../../helpers/models';

const EquipmentHistoryComponent: ListRenderItem<EquipmentHistory> = ({
  item,
}) => {
  return (
    <View style={styles.equipment}>
      <View>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Data e Hora: {item.date}</Text>
        </Text>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Estado: {item.status}</Text>
        </Text>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Editado por: {item.userName}</Text>
        </Text>
      </View>
      <Text
        style={[
          styles.status,
          item.isActive ? styles.activeStatus : styles.inactiveStatus,
        ]}>
        {item.isActive}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  equipment: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '96%',
    borderRadius: 2,
    marginLeft: 6,
    marginTop: 4,
    backgroundColor: '#363636',
  },
  serial: {
    marginLeft: 6,
    fontSize: 16,
    color: '#EEE',
    marginTop: 5,
  },
  status: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 16,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  activeStatus: {
    backgroundColor: '#90EE90', // Estilo para quando item.isActive for true
  },
  inactiveStatus: {
    backgroundColor: '#D2691E', // Estilo para quando item.isActive for false
  },
});

export default EquipmentHistoryComponent;

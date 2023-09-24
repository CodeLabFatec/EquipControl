import React from 'react';
import {StyleSheet, Text, View, ListRenderItem, Pressable} from 'react-native';
import {Equipment} from '../../helpers/models';
import navigate from '../../RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from './carousel';

const EquipmentComponent: ListRenderItem<Equipment> = ({item}) => {

  return (
    <View style={styles.equipment}>
      <Pressable style={styles.name} onPress={() => navigate('InfoEquipment', item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.serial}>Nº Série: {item.serial}</Text>
        <Text style={[styles.status, item.isActive ? styles.activeStatus : styles.inactiveStatus]}>{item.isActive}</Text>
      </Pressable>
      {item.files && item.files.length > 0 ? (
        <Carousel files={item.files ?? []} />
      ) : (
        <View style={styles.fileIconContainer}>
          <Icon style={styles.fileIcon} name="file-image" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  equipment: {
    width: '48%',
    height: 200,
    zIndex: 1,
    borderColor: '#363636',
    borderWidth: 1,
    borderRadius: 2,
    marginLeft: 4,
    marginTop: 4,
    backgroundColor: '#363636',
  },
  name: {
    fontSize: 18,
    color: '#E2D7C1',
    fontWeight: 'bold',
    marginTop: 5,
  },
  serial: {
    fontSize: 16,
    color: '#BFAD95',
  },
  emptyFile: {},
  fileIcon: {
    textAlign: 'center',
    fontSize: 25,
    color: '#cccccc',
  },
  fileIconContainer: {
    marginHorizontal: 'auto',
    paddingVertical: 65,
  },
  status: {
    position: 'absolute',
    right: 4,
    width: 16,
    borderRadius: 100,
    backgroundColor: 'blue'
  },
  activeStatus: {
    backgroundColor: '#90EE90', // Estilo para quando item.isActive for true
  },
  inactiveStatus: {
    backgroundColor: '#D2691E', // Estilo para quando item.isActive for false
  },
});

export default EquipmentComponent;

import React from 'react';
import {StyleSheet, Text, View, ListRenderItem, Pressable} from 'react-native';
import {Equipment} from '../../helpers/models';
import navigate from '../../RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from './carousel';

const EquipmentComponent: ListRenderItem<Equipment> = ({item}) => {
  return (
    <View style={styles.equipment}>
      <Pressable onPress={() => navigate('InfoEquipment', item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.serial}>Nº Série: {item.serial}</Text>
      </Pressable>
      {item.files && item.files.length > 0 ? (
        <Carousel files={item.files ?? []} />
      ) : (
        <View>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    marginLeft: 4,
    marginTop: 4,
    backgroundColor: '#61605f',
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  serial: {
    fontSize: 16,
    color: 'gray',
  },
  emptyFile: {},
  fileIcon: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
});

export default EquipmentComponent;

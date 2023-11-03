import React from 'react';
import {StyleSheet, Text, View, ListRenderItem, Pressable} from 'react-native';
import {Equipment} from '../../../helpers/models';
import navigate from '../../../RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '../carousel/carousel';

const EquipmentHstc: ListRenderItem<Equipment> = ({item}) => {
  return (
    <View style={styles.equipment}>
      <View style={styles.carrouselContainer}>
        {item.files && item.files.length > 0 ? (
          <Carousel width={150} files={item.files ?? []} />
        ) : (
          <View style={styles.fileIconContainer}>
            <Icon style={styles.fileIcon} name="file-image" />
          </View>
        )}
      </View>
      <Pressable
        style={styles.titleContainer}
        onPress={() => navigate('HistoricEquipment', item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Nº Série: </Text>
          {item.serial}
        </Text>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Hora: </Text> 
        </Text>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Data: </Text> 
        </Text>
        <Text style={styles.serial}>
          <Text style={{fontWeight: 'bold'}}>Editado por: </Text>{' '}
          {/* {item.created_by?.name} */}
        </Text>
      </Pressable>
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '56%',
    marginTop: 4,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    color: '#77A490',
    fontWeight: 'bold',
    marginLeft: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  serial: {
    marginLeft: 6,
    fontSize: 16,
    color: '#EEE',
    marginTop: 5,
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
  carrouselContainer: {
    width: '42%',
    height: 170,
    zIndex: 1,
    marginLeft: 6,
    marginTop: 4,
    marginBottom: 4,
  },
});

export default EquipmentHstc;
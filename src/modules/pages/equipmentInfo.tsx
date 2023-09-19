import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Equipment} from '../../helpers/models';
import Carousel from '../components/carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';

function EquipmentInfo({navigation, route}) {
  const equipment: Equipment = route.params;

  if (!equipment) {
    navigation.navigate('Home');
    return;
  }

  return (
    <View>
      <Text>Teste - {equipment.name}</Text>
      <View style={styles.equipment}>
        {equipment.files && equipment.files.length > 0 ? (
          <Carousel files={equipment.files ?? []} />
        ) : (
          <View>
            <Icon style={styles.fileIcon} name="file-image" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  equipment: {
    width: '70%',
    height: 200,
    zIndex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    marginLeft: 4,
    marginTop: 4,
    backgroundColor: '#61605f',
  },
  fileIcon: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
});

export default EquipmentInfo;

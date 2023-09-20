import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { equipmentController } from '../../api';
import { Equipment } from '../../helpers/models';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '../components/carousel';

function EquipmentRegister({ navigation, route }) {

  return (
    <View>
      <Text>oi</Text>
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
    backgroundColor: '#111111',
  },
  name: {
    color: '#fff',
  },
  fileIcon: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
});

export default EquipmentRegister;

import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {equipmentController} from '../../api';
import {Equipment} from '../../helpers/models';

function EquipmentRegister({navigation}) {
  const [equipments] = useState<Equipment[]>(equipmentController.list());

  return (
    <View>
      {equipments.map(item => (
        <Text key={item._id}>{item.name}, </Text>
      ))}
    </View>
  );
}

export default EquipmentRegister;

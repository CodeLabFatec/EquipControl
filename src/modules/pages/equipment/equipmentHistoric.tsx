import React, {useContext, useState} from 'react';
import {StyleSheet, FlatList, View, Text, Pressable} from 'react-native';
import {EquipmentHistory} from '../../../helpers/models';
import EquipmentHistoryComponent from '../../components/equipment/equipment-historic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import {equipmentController} from '../../../services';
import {LoadContext} from '../../../contexts';

function EquipmentHistoric({navigation, route}) {
  const {id} = route.params;
  const {setLoading} = useContext(LoadContext);
  const [history, setHistory] = useState<EquipmentHistory[]>([]);

  const loadHistory = async () => {
    setLoading(true);
    const result = await equipmentController.getHistory(id);
    setLoading(false);
    if (result) {
      setHistory(result);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      if (!id || id === '') {
        navigation.navigate('Home');
        return;
      }
      loadHistory();
    }, []),
  );

  return (
    <View>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon style={styles.back} name="arrow-left" />
      </Pressable>
      {!history ||
        (history.length === 0 && (
          <Text style={styles.none}>Nenhuma manobra realizada</Text>
        ))}
      <FlatList
        data={history}
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
  back: {
    fontSize: 26,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default EquipmentHistoric;

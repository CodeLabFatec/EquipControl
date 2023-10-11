import React from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import navigate from '../../../RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  value: string;
  onChangeText: (text: React.SetStateAction<string>) => void;
}

const SearchEquipment = ({value, onChangeText}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon style={styles.icon} name="search" />
        <TextInput
          style={styles.input}
          placeholder={'Pesquisar...'}
          placeholderTextColor="#E2D7C1"
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      <Pressable
        style={styles.addIconContainer}
        onPress={() => navigate('RegisterDomain')}>
        <Icon style={styles.addIcon} name="plus-circle" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#E2D7C1',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#7395AE',
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E2D7C1',
    width: '85%',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
  addIconContainer: {
    width: '12%',
    height: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  addIcon: {
    fontSize: 38,
    position: 'absolute',
    right: 5,
    bottom: 5,
    color: '#77A490',
  },
});

export default SearchEquipment;

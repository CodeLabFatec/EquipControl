import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, TextInput, Image, StyleSheet} from 'react-native';

const SearchEquipment = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/64/64673.png',
        }}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={'Pesquisar...'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
});

export default SearchEquipment;

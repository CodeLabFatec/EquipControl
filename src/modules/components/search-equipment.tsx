import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, TextInput, Image, StyleSheet} from 'react-native';

const SearchEquipment = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/64/64673.png',
          }}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={'Pesquisar...'}
          placeholderTextColor="#CCC" 
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.addIconContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1004/1004759.png',
          }}
          style={styles.addIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'gray',
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
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
    width: 38,
    height: 38,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});

export default SearchEquipment;

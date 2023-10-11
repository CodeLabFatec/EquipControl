import React from 'react';
import {StyleSheet, Text, View, ListRenderItem, Pressable} from 'react-native';
import {Domain} from '../../../helpers/models';
import navigate from '../../../RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '../carousel/carousel';

const DomainComponent: ListRenderItem<Domain> = ({item}) => {
  return (
    <View style={styles.domain}>
      <Pressable
        style={styles.name}
        onPress={() => navigate('InfoDomain', item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.nameType}>Nome {item.name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  domain: {
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
  nameType: {
    fontSize: 16,
    color: '#BFAD95',
  },
});

export default DomainComponent;

import React from 'react';
import {StyleSheet, Text, View, ListRenderItem, Pressable} from 'react-native';
import {Domain} from '../../../helpers/models';
import navigate from '../../../RootNavigation';

const DomainComponent: ListRenderItem<Domain> = ({item}) => {
  return (
    <View style={styles.domain}>
      <Pressable
        style={styles.name}
        onPress={() => navigate('InfoDomain', item)}>
        <Text style={styles.name}>{item.name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  domain: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '96%',
    borderRadius: 2,
    marginLeft: 6,
    marginTop: 4,
    backgroundColor: '#363636',
  },
  name: {
    fontSize: 20,
    color: '#E2D7C1',
    fontWeight: 'bold',
    marginLeft: 6,
    marginTop: 4,
    marginBottom: 4,
    padding: 5
  },
  nameType: {
    marginLeft: 6,
    fontSize: 16,
    color: '#EEE',
    marginTop: 5,
  },
});

export default DomainComponent;

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import navigate from '../../RootNavigation';

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Pressable
        style={styles.Button}
        onPress={() => navigate('Home')}>
        <Text style={styles.ButtonText}>Equipamentos</Text>
      </Pressable>
      <Pressable
        style={styles.Button}
        onPress={() => navigate('ListDomain')}>
        <Text style={styles.ButtonText}>Domínios</Text>
      </Pressable>
      <Pressable
        style={styles.Button}
        onPress={() => navigate('ListUsers')}>
        <Text style={styles.ButtonText}>Usuários</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 55,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#77A490',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  Button: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#77A490',
    width: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  ButtonText: {
    textAlign: 'center',
    paddingTop: 5,
    color: '#EEEEEE',
  },
});

export default Footer;

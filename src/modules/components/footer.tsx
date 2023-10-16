import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import navigate from '../../RootNavigation';

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Pressable
        style={styles.equipmentButton}
        onPress={() => navigate('Home')}>
        <Text style={styles.ButtonText}>Equipamentos</Text>
      </Pressable>
      <Pressable
        style={styles.domainButton}
        onPress={() => navigate('ListDomain')}>
        <Text style={styles.ButtonText}>Domínios</Text>
      </Pressable>
      <Pressable
        style={styles.userButton}
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
  equipmentButton: {
    borderLeftWidth: 1,
    borderColor: '#77A490',
    width: 90,
    marginVertical: 5,
  },
  domainButton: {
    borderLeftWidth: 1,
    borderColor: '#77A490',
    width: 90,
    marginVertical: 5,
  },
  userButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#77A490',
    width: 90,
    marginVertical: 5,
  },
  ButtonText: {
    textAlign: 'center',
    paddingTop: 12,
    color: '#EEEEEE',
  },
});

export default Footer;

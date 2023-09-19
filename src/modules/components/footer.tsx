import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import navigate from '../../RootNavigation';

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Pressable
        style={styles.equipamentosButton}
        onPress={() => navigate('Home')}>
        <Text style={styles.equipamentosButtonText}>Lista de equipamentos</Text>
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
    borderTopColor: 'grey',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  equipamentosButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'grey',
    width: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  equipamentosButtonText: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
  },
});

export default Footer;

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

function Footer(): JSX.Element {
  return (
    <View style={styles.footerContainer}>
      <Pressable
        style={styles.equipamentosButton}
        onPress={() => {
          console.log('Clicaste');
        }}>
        <Text style={styles.equipamentosButtonText}>Equipamentos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 40,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  equipamentosButton: {
    backgroundColor: 'green',
    width: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  equipamentosButtonText: {
    textAlign: 'center',
    paddingTop: 5,
  },
});

export default Footer;

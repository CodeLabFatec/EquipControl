import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default function LogoLoginComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo-login.png')}
        style={{
          marginLeft: 35,
          marginBottom: 70,
          width: '80%',
          height: 50,
          objectFit: 'contain',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 10,
  },
  default: {
    backgroundColor: '#363636',
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    color: '#EEEEEE',
  },
});

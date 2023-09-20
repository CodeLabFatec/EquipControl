import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={styles.headerLogo}
      /> */}
      <View>
        <Text style={styles.headerTextsBigger}>EquipControl</Text>
        <Text style={styles.headerTextsMedium}>Gestão de equipamentos</Text>
      </View>
      {/* <View style={styles.userBox}>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={styles.headerUser}
        />
        <Text style={styles.textUser}>Usuário</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: 2,
    borderBottomColor: '#E2D7C1',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerTextsBigger: {
    fontSize: 30,
    color: '#EEEEEE'
  },
  headerTextsMedium: {
    fontSize: 20,
    color: '#A7A6A6'
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  headerUser: {
    width: 45,
    height: 45,
    alignSelf: 'flex-end',
  },
  textUser: {
    alignSelf: 'flex-end',
    color:'white'
  },
  userBox: {
    position: 'absolute', 
    right: 0,
  },
});

export default Header;

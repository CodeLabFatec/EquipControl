import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={styles.headerLogo}
      />
      <View>
        <Text style={styles.headerTextsBigger}>EquipControl</Text>
        <Text style={styles.headerTextsMedium}>Gestão de equipamentos</Text>
      </View>
      {/* <View>
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
    borderBottomColor: 'grey',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerTextsBigger: {
    fontSize: 30,
  },
  headerTextsMedium: {
    fontSize: 20,
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  headerUser: {
    width: 45,
    height: 45,
    marginLeft: 65,
  },
  textUser: {
    marginLeft: 70,
  },
});

export default Header;

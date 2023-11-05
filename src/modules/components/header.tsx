import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {AuthContext} from '../../contexts';
import Dropdown from './base/dropdown';
import navigate from '../../RootNavigation';

function Header() {
  const {user, logout} = useContext(AuthContext);

  const dropdownItems: any[] = [
    {
      value: null,
      label: (user && user.name) ?? 'Usuário',
      onPress: null,
      textStyle: {textAlign: 'center'},
    },
    {value: null, label: 'Perfil', onPress: () => navigate('Profile')},
    {value: null, label: 'Sair', onPress: () => logout()},
  ];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogo}>
        <Image
          source={require('../../../assets/logo-equip-control.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.userBox}>
        <Dropdown items={dropdownItems}>
          {user && user.image ? (
            <Image
              source={{
                uri: `data:${user.image.type};base64,${user.image.base64}`,
              }}
              style={styles.headerUser}
            />
          ) : (
            <Image
              source={require('../../../assets/usuario.png')}
              style={styles.headerUser}
            />
          )}
        </Dropdown>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: 2,
    borderBottomColor: '#77A490',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerLogo: {
    width: 60,
    height: 60,
    marginLeft: 20
  },
  image: {
    marginTop: 10,
    width: 50,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
  },
  headerUser: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    borderRadius: 50,
  },
  textUser: {
    color: 'white',
  },
  userBox: {
    position: 'absolute',
    textAlign: 'center',
    right: 5,
    marginRight: 10,
    paddingTop: 12,
  },
});

export default Header;

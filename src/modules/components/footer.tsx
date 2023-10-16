import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import navigate from '../../RootNavigation';
import {AuthContext} from '../../contexts';

function Footer() {
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.footerContainer}>
      <Pressable
        style={user?.isAdmin ? styles.equipmentButton : styles.Button}
        onPress={() => navigate('Home')}>
        <Text style={styles.ButtonText}>Equipamentos</Text>
      </Pressable>
      {user?.isAdmin && (
        <>
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
        </>
      )}
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
  Button: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#77A490',
    width: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default Footer;

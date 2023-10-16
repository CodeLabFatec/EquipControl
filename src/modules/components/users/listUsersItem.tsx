import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  Pressable,
  Image,
} from 'react-native';
import {User} from '../../../helpers/models';
import navigate from '../../../RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {userValidator} from '../../../helpers/validators';

const ListUsersItem: ListRenderItem<User> = ({item}) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.carrouselContainer}>
        {item.image ? (
          <Image
            style={{width: 140, height: '100%'}}
            source={{
              uri: `data:${item.image.type};base64,${item.image.base64}`,
            }}
          />
        ) : (
          <View style={styles.fileIconContainer}>
            <Icon style={styles.fileIcon} name="file-image" />
          </View>
        )}
      </View>
      <Pressable
        style={styles.titleContainer}
        onPress={() => navigate('EditUser', item)}>
        <Text style={styles.title}>
          {item.name} {item.lastName}
        </Text>
        <Text style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>E-mail: </Text>
          {item.email}
        </Text>
        <Text style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>Telefone: </Text>{' '}
          {userValidator.formatPhone(item.phone)}
        </Text>
        <Text style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>CPF: </Text>{' '}
          {userValidator.formatCPF(item.cpf)}
        </Text>
      </Pressable>
      {/* <Text
        style={[
          styles.status,
          item.isActive ? styles.activeStatus : styles.inactiveStatus,
        ]}>
        {item.isActive}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '96%',
    borderRadius: 2,
    marginLeft: 6,
    marginTop: 4,
    backgroundColor: '#363636',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '56%',
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: '#77A490',
    fontWeight: 'bold',
    marginLeft: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  card: {
    marginLeft: 6,
    fontSize: 16,
    color: '#EEE',
    marginTop: 5,
  },
  emptyFile: {},
  fileIcon: {
    textAlign: 'center',
    fontSize: 25,
    color: '#cccccc',
  },
  fileIconContainer: {
    marginHorizontal: 'auto',
    paddingVertical: 65,
  },
  status: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 16,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  activeStatus: {
    backgroundColor: '#90EE90', // Estilo para quando item.isActive for true
  },
  inactiveStatus: {
    backgroundColor: '#D2691E', // Estilo para quando item.isActive for false
  },
  carrouselContainer: {
    width: '42%',
    height: 170,
    zIndex: 1,
    marginLeft: 6,
    marginTop: 4,
    marginBottom: 4,
  },
});

export default ListUsersItem;

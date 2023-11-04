import React, {useContext, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {LoadContext} from '../../../contexts';
import {User} from '../../../helpers/models';
import {userController} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import ListUsersItem from '../../components/users/listUsersItem';
import SearchBar from '../../components/base/search-bar';

function ListUsers({navigation}) {
  const {setLoading} = useContext(LoadContext);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');

  async function load() {
    const data = await userController.list();
    setUsers(data);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      load();
    }, []),
  );

  const filteredUser = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <View>
      <SearchBar
        newItemPage="RegisterUser"
        value={filter}
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      <FlatList
        data={filteredUser}
        renderItem={ListUsersItem}
        numColumns={1}
        contentContainerStyle={styles.userList}
        keyExtractor={item => item._id ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userList: {
    paddingBottom: 120,
  },
});

export default ListUsers;

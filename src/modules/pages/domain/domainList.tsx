import React, {useContext, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {LoadContext} from '../../../contexts';
import DomainComponent from '../../components/domain/domain-item';
import {Domain} from '../../../helpers/models/domain';
import {domainController} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../components/base/search-bar';

function DomainList({navigation}) {
  const {setLoading} = useContext(LoadContext);
  const [domain, setDomain] = useState<Domain[]>([]);
  const [filter, setFilter] = useState('');

  async function load() {
    const data = await domainController.list();
    setDomain(data);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      load();
    }, []),
  );

  const filteredDomain = domain.filter(domain => domain.name.includes(filter));

  return (
    <View>
      <SearchBar
        newItemPage="RegisterDomain"
        value={filter}
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      <FlatList
        data={filteredDomain}
        renderItem={DomainComponent}
        numColumns={1}
        contentContainerStyle={styles.domainList}
        keyExtractor={item => item.name ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  domainList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 175,
  },
});

export default DomainList;

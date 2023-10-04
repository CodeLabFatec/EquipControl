import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../contexts';

function Test({navigation}) {
  const {login} = useContext(AuthContext);

  return (
    <View>
      <Text>Teste</Text>
      <Button title="Logar" onPress={() => login('aa', 'aa')} />
    </View>
  );
}
export default Test;

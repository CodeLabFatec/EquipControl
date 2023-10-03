import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import InputComponent from '../components/inputComponent';
import PressableButton from '../components/pressableButton';
import {AuthContext, LoadContext} from '../../contexts';

function Login({navigation}) {
  const {login} = useContext(AuthContext);
  const {isLoading, setLoading} = useContext(LoadContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if (username.trim() === '') return;
    if (password.trim() === '') return;

    setLoading(true);
    await login(username, password);
  };

  return (
    <View style={styles.container}>
      <InputComponent
        label="Usuário"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={e => setUsername(e)}
      />

      <InputComponent
        label="Senha"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={e => setPassword(e)}
      />

      <PressableButton
        children="Entrar"
        pressableStyle={styles.pressableContainer}
        textStyle={styles.enterButton}
        onPress={signIn}
      />

      <PressableButton
        children="Esqueci minha senha"
        pressableStyle={styles.pressableContainer}
        textStyle={styles.forgotPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputWidth: {
    width: '93%',
  },
  labelMargin: {
    marginLeft: 15,
  },
  forgotPassword: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  pressableContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  enterButton: {
    backgroundColor: '#77A490',
    width: '93%',
    fontSize: 20,
  },
});

export default Login;

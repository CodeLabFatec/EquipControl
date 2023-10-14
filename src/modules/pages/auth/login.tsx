import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import {AuthContext, LoadContext} from '../../../contexts';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Login({navigation}) {
  const {login} = useContext(AuthContext);
  const {isLoading, setLoading} = useContext(LoadContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={e => setPassword(e)}
        rightIcon={
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.passwordVisibilityButton}>
            {showPassword ? (
              <Icon style={styles.eyeIcon} name="eye-slash" />
            ) : (
              <Icon style={styles.eyeIcon} name="eye" />
            )}
          </Pressable>
        }
      />

      <PressableButton
        children="Entrar"
        pressableStyle={styles.pressableContainer}
        textStyle={styles.enterButton}
        onPress={signIn}
        disabled={isLoading}
      />

      <PressableButton
        children="Esqueci minha senha"
        pressableStyle={styles.pressableContainer}
        textStyle={styles.forgotPassword}
        disabled={isLoading}></PressableButton>
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
  passwordVisibilityButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  eyeIcon: {
    fontSize: 16,
    color: '#EEEEEE'
    
  },
});

export default Login;

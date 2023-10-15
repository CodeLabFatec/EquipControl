import React, {useContext, useEffect, useState} from 'react';
import {Alert, Pressable, StyleSheet, Switch, View} from 'react-native';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import {AuthContext, LoadContext} from '../../../contexts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchComponent from '../../components/base/switch';
import * as LocalAuthentication from 'expo-local-authentication';
import LogoLoginComponent from '../../components/base/login-logo';

function Login({navigation}) {
  const {login, setBiometricOptions, validateBiometricToken} =
    useContext(AuthContext);
  const {isLoading, setLoading} = useContext(LoadContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [biometricCanceled, setBiometricCanceled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = (value: boolean) => {
    setRememberMe(value);
  };

  const rememberUser = async () => {
    try {
      await AsyncStorage.setItem('savedUsername', username);
    } catch (error) {
      // Error saving data
    }
  };

  const getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem('savedUsername');
      if (username !== null) {
        setUsername(username || '');
        setRememberMe(username ? true : false);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('savedUsername');
    } catch (error) {
      // Error removing
    }
  };

  const setBiometricOptionOnPhone = async () => {
    const biometric = await setBiometricOptions(
      '651188b144fcf07d7bb8a5bb',
      true,
    );

    const data = {
      token: biometric.token,
      username: biometric.user.username,
      active: true,
    };

    await AsyncStorage.setItem('biometricOptionSaved', JSON.stringify(data));
  };

  const signIn = async (biometricPass?: string) => {
    if (username.trim() === '') return;
    if (password.trim() === '') return;
    setLoading(true);

    if (rememberMe === true) {
      rememberUser();
    } else {
      forgetUser();
    }

    await login(username, password);
  };

  const biometricSignIn = async (biometricPass?: string) => {
    if (username.trim() === '') return;
    if (!biometricPass) return;
    setLoading(true);

    if (rememberMe === true) {
      rememberUser();
    } else {
      forgetUser();
    }

    await login(username, biometricPass);
  };

  async function handleBiometricAuthentication() {
    if (biometricCanceled) {
      setBiometricCanceled(!biometricCanceled);

      return;
    }

    const hasBiometric = await LocalAuthentication.hasHardwareAsync();

    if (!hasBiometric) return;

    const biometricOptionSaved = await AsyncStorage.getItem(
      'biometricOptionSaved',
    );

    if (biometricOptionSaved === null) return;

    const jsonBiometricOptions = JSON.parse(biometricOptionSaved);

    if (
      jsonBiometricOptions.active === 'FALSE' ||
      username !== jsonBiometricOptions.username
    )
      return;

    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) return;

    // return Alert.alert(
    //   'Login',
    //   'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo.',
    // );

    const validateToken = await validateBiometricToken(
      `Bearer ${jsonBiometricOptions.token}`,
      username,
    );

    if (validateToken.auth === false) {
      return Alert.alert(
        'Login',
        'Biometria não autorizada. Por favor, tente novamente.',
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com biometria',
      fallbackLabel: 'Biometria não reconhecida',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: true,
      requireConfirmation: true,
    });

    if (auth.success) {
      biometricSignIn(validateToken.user?.password);
    } else {
      setBiometricCanceled(true);
    }

    return;
  }

  useEffect(() => {
    getRememberedUser();
  }, []);

  return (
    <View style={styles.container}>
      <LogoLoginComponent/>
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
        onPressIn={() => handleBiometricAuthentication()}
      />
      <SwitchComponent
        label="Lembrar usuário?"
        rightIcon={
          <Switch
            value={rememberMe}
            onValueChange={toggleRememberMe}
            disabled={isLoading}
            thumbColor={'#EEEEEE'}
            trackColor={{
              false: '#363636',
              true: '#77A490',
            }}
          />
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
        disabled={isLoading}
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
  passwordVisibilityButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  eyeIcon: {
    fontSize: 16,
    color: '#EEEEEE',
  },
});

export default Login;

import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import CodeInput from '../../components/base/codeInput';
import {alertError} from '../../../helpers/utils';
import navigate from '../../../RootNavigation';
import userController from '../../../services/controllers/UserController';
import {LoadContext} from '../../../contexts';
import LogoLoginComponent from '../../components/base/login-logo';

const Step = {
  SEND_CODE: 1,
  IN_CODE: 2,
};

const tranformCode = (array: string[]) => {
  let string = '';
  return string.concat(...array);
};

function RecoverPassword() {
  const {isLoading, setLoading} = useContext(LoadContext);

  const [step, setStep] = useState(Step.SEND_CODE);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const sendCode = async () => {
    if (userName.trim() === '') return;

    setLoading(true);
    const response = await userController.sendRecoverCode(userName);

    setLoading(false);
    if (response.errorMessage) {
      alertError(response.errorMessage);
    } else {
      setStep(Step.IN_CODE);
    }
  };

  const recoverPassword = async () => {
    const passCode = tranformCode(code);

    if (
      userName.trim() === '' ||
      password.trim() === '' ||
      passwordConfirmation.trim() === '' ||
      passCode.trim().length === 0
    ) {
      return;
    }

    if (password !== passwordConfirmation) {
      alertError('Senha e confirmação devem ser iguais!');
      return;
    }

    setLoading(true);
    const response = await userController.recoverPassword(
      userName,
      password,
      passCode,
    );

    setLoading(false);
    if (response.errorMessage) {
      alertError(response.errorMessage);
    } else {
      navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <LogoLoginComponent />
      {step === Step.SEND_CODE && (
        <>
          <InputComponent
            label="Usuário"
            inputStyle={styles.inputWidth}
            labelStyle={styles.labelWidth}
            value={userName}
            onChangeText={e => setUserName(e)}
            placeholder="Usuário"
          />

          <PressableButton
            children="Enviar código"
            textStyle={styles.recoverButton}
            onPress={sendCode}
            disabled={isLoading}
          />
        </>
      )}

      {step === Step.IN_CODE && (
        <>
          <Text style={styles.label}>Código</Text>
          <CodeInput value={code} onChangeText={setCode} />

          <InputComponent
            label="Senha"
            inputStyle={styles.inputWidth}
            labelStyle={styles.labelWidth}
            placeholder="Senha"
            value={password}
            secureTextEntry={true}
            onChangeText={e => setPassword(e)}
          />

          <InputComponent
            label="Confirmar senha"
            inputStyle={styles.inputWidth}
            labelStyle={styles.labelWidth}
            placeholder="Confirmar senha"
            secureTextEntry={true}
            value={passwordConfirmation}
            onChangeText={e => setPasswordConfirmation(e)}
          />

          <PressableButton
            children="Alterar senha"
            textStyle={styles.recoverButton}
            onPress={recoverPassword}
            disabled={isLoading}
          />
        </>
      )}
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
  labelWidth: {
    marginLeft: 15,
  },
  recoverButton: {
    backgroundColor: '#77A490',
    width: '93%',
    fontSize: 20,
  },
  label: {
    color: '#EEEEEE',
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 15,
  },
});

export default RecoverPassword;

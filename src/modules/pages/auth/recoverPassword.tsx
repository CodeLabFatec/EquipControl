import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import CodeInput from '../../components/base/codeInput';

function RecoverPassword({navigation}) {
  return (
    <View style={styles.container}>
      <InputComponent
        label="Usuário"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelWidth}
        placeholder="Usuário"
      />

      <PressableButton
        children="Enviar código"
        textStyle={styles.recoverButton}
      />

      <CodeInput />

      <PressableButton
        children="Confirmar código"
        textStyle={styles.recoverButton}
      />

      <InputComponent
        label="Senha"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelWidth}
        placeholder="Senha"
      />

      <InputComponent
        label="Confirmar senha"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelWidth}
        placeholder="Confirmar senha"
      />

      <PressableButton
        children="Alterar senha"
        textStyle={styles.recoverButton}
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
  labelWidth: {
    marginLeft: 15,
  },
  recoverButton: {
    backgroundColor: '#77A490',
    width: '93%',
    fontSize: 20,
  },
});

export default RecoverPassword;

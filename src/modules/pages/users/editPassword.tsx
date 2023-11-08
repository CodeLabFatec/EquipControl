import React, {useContext, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext, LoadContext} from '../../../contexts';
import {userValidator} from '../../../helpers/validators';
import {userController} from '../../../services';
import {alertResult} from '../../../helpers/utils';

const EditPassword = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const {isLoading, setLoading} = useContext(LoadContext);

  if (!user) {
    navigation.navigate('Login');

    return <></>;
  }
  const [Mypassword, setMyPassword] = useState('');
  const [Newpassword, setNewPassword] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');

  const [showMyPassword, setShowMyPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isUpperCaseValid, setIsUpperCaseValid] = useState(false);
  const [isLowerCaseValid, setIsLowerCaseValid] = useState(false);
  const [isDigitValid, setIsDigitValid] = useState(false);
  const [isSymbolValid, setIsSymbolValid] = useState(false);

  const [isMyPasswordValid, setIsMyPasswordValid] = useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const toggleMyPasswordVisibility = () => {
    setShowMyPassword(!showMyPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const changePasswordUser = async () => {
    if (Mypassword.length == 0) {
      setIsMyPasswordValid(false);
      return;
    }

    if (Newpassword.length == 0) {
      setIsNewPasswordValid(false);
      return;
    }

    if (Confirmpassword.length == 0) {
      setIsConfirmPasswordValid(false);
      return;
    }

    if (Newpassword !== Confirmpassword) {
      setIsConfirmPasswordValid(false);
      return;
    }

    const validaSenha = userValidator.validatePassword(Newpassword);

    if (!validaSenha) {
      setIsNewPasswordValid(false);
    }

    setLoading(true);
    const result = await userController.updatePassword(
      user._id,
      Mypassword,
      Newpassword,
    );
    const resultSuccess = result.errorMessage ? false : true;

    setLoading(false);
    alertResult(
      resultSuccess,
      'Senha alterada com sucesso.',
      result.errorMessage,
      'Home',
    );
  };

  return (
    <ScrollView style={styles.container}>
      <InputComponent
        label="Senha atual"
        inputStyle={[
          isMyPasswordValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        placeholder="Senha atual"
        secureTextEntry={!showMyPassword}
        value={Mypassword}
        onChangeText={text => {
          setIsMyPasswordValid(true);
          setMyPassword(text);
        }}
        rightIcon={
          <Pressable
            onPress={toggleMyPasswordVisibility}
            style={styles.passwordVisibilityButton}>
            {showMyPassword ? (
              <Icon style={styles.eyeIcon} name="eye-slash" />
            ) : (
              <Icon style={styles.eyeIcon} name="eye" />
            )}
          </Pressable>
        }
        onBlur={() => {
          if (Mypassword.length == 0) {
            setIsMyPasswordValid(false);
          }
        }}
      />

      <InputComponent
        label="Nova senha"
        inputStyle={[
          isNewPasswordValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        placeholder="Nova senha"
        secureTextEntry={!showNewPassword}
        value={Newpassword}
        onChangeText={text => {
          setIsNewPasswordValid(true);
          setNewPassword(text);
          const isLengthValid = text.length >= 10 && text.length <= 20;
          const isUpperCaseValid = /[A-Z]/.test(text);
          const isLowerCaseValid = /[a-z]/.test(text);
          const isDigitValid = /[0-9]/.test(text);
          const isSymbolValid = /[!@#$_]/.test(text);

          setIsLengthValid(isLengthValid);
          setIsUpperCaseValid(isUpperCaseValid);
          setIsLowerCaseValid(isLowerCaseValid);
          setIsDigitValid(isDigitValid);
          setIsSymbolValid(isSymbolValid);

          if (
            !isLengthValid ||
            !isUpperCaseValid ||
            !isLowerCaseValid ||
            !isDigitValid ||
            !isSymbolValid
          ) {
            setIsNewPasswordValid(false);
          }
        }}
        rightIcon={
          <Pressable
            onPress={toggleNewPasswordVisibility}
            style={styles.passwordVisibilityButton}>
            {showNewPassword ? (
              <Icon style={styles.eyeIcon} name="eye-slash" />
            ) : (
              <Icon style={styles.eyeIcon} name="eye" />
            )}
          </Pressable>
        }
        onBlur={() => {
          if (Newpassword.length == 0) {
            setIsNewPasswordValid(false);
          }
        }}
      />

      <InputComponent
        label="Confirmar senha"
        inputStyle={[
          isConfirmPasswordValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        placeholder="Confirmar senha"
        secureTextEntry={!showConfirmPassword}
        value={Confirmpassword}
        onChangeText={text => {
          if (Confirmpassword != Newpassword) {
            setIsConfirmPasswordValid(false);
          } else {
            setIsConfirmPasswordValid(true);
          }
          setConfirmPassword(text);
        }}
        rightIcon={
          <Pressable
            onPress={toggleConfirmPasswordVisibility}
            style={styles.passwordVisibilityButton}>
            {showConfirmPassword ? (
              <Icon style={styles.eyeIcon} name="eye-slash" />
            ) : (
              <Icon style={styles.eyeIcon} name="eye" />
            )}
          </Pressable>
        }
        onBlur={() => {
          setIsConfirmPasswordValid(true);
          if (Confirmpassword.length == 0) {
            setIsConfirmPasswordValid(false);
          }
          if (Confirmpassword != Newpassword) {
            setIsConfirmPasswordValid(false);
          }
        }}
      />

      <View style={styles.validationsLabel}>
        <Text style={styles.text}>A senha deve conter:</Text>
        <Text
          style={[
            styles.validationLabel,
            isLengthValid ? styles.validationLabelValid : null,
          ]}>
          - Entre 10 e 20 caracteres.
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isUpperCaseValid ? styles.validationLabelValid : null,
          ]}>
          - Uma letra maiúscula (A-Z).
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isLowerCaseValid ? styles.validationLabelValid : null,
          ]}>
          - Uma letra minúscula (a-z).
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isDigitValid ? styles.validationLabelValid : null,
          ]}>
          - Um número (0-9).
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isSymbolValid ? styles.validationLabelValid : null,
          ]}>
          - Um dos símbolos: !, @, #, $ ou _.
        </Text>
      </View>

      <View style={styles.pressableContainer}>
        <PressableButton
          pressableStyle={styles.saveButton}
          onPress={changePasswordUser}
          disabled={isLoading}>
          Salvar
        </PressableButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 50,
  },
  inputWidth: {
    width: '93%',
  },
  labelMargin: {
    marginLeft: 15,
  },
  pressableContainer: {
    marginTop: 20,
    width: '100%',
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#77A490',
    width: '96%',
    borderRadius: 10,
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
  isValid: {
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  validationLabel: {
    color: '#EEE',
    fontSize: 14,
    marginTop: 2,
  },
  validationLabelValid: {
    color: '#77A490',
  },
  validationsLabel: {
    width: '93%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  isRequired: {
    borderColor: 'red',
    borderWidth: 0.5,
    borderRadius: 5,
  },
});

export default EditPassword;

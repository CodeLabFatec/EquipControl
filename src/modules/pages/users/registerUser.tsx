import React, {useContext, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AuthContext, LoadContext} from '../../../contexts';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import {defaultUser, userValidator} from '../../../helpers/validators';
import {
  alertError,
  alertRequest,
  alertResult,
  requestReadImages,
  updateUserImage,
} from '../../../helpers/utils';
import {userController} from '../../../services';
import Icon from 'react-native-vector-icons/FontAwesome5';

function RegisterUser({navigation}) {
  const {user} = useContext(AuthContext);

  if (!user) {
    navigation.navigate('Home');

    return <></>;
  }

  const [usuario, setUsuario] = React.useState(defaultUser);
  const {isLoading, setLoading} = useContext(LoadContext);

  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isSobrenomeValid, setIsSobrenomeValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isTelefoneValid, setIsTelefoneValid] = React.useState(true);
  const [isMatriculaValid, setIsMatriculaValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isUserNameValid, setIsUserNameValid] = React.useState(true);
  const [isCpfValid, setIsCpfValid] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(false);

  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isUpperCaseValid, setIsUpperCaseValid] = useState(false);
  const [isLowerCaseValid, setIsLowerCaseValid] = useState(false);
  const [isDigitValid, setIsDigitValid] = useState(false);
  const [isSymbolValid, setIsSymbolValid] = useState(false);
  // const updatePhoto = async () => {
  //   if (isLoading) return;

  //   try {
  //     const hasPermissionReadImages = await requestReadImages();

  //     if (hasPermissionReadImages) {
  //       await updateUserImage(usuario, setUsuario);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const togglePasswordVisibility = () => {
    console.log('entrou');
    
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    const validaSubmit = userValidator.validateUser(usuario);

    if (validaSubmit) {
      if (validaSubmit.includes('name')) {
        console.log(validaSubmit);
        setIsNameValid(false);
      }
      if (validaSubmit.includes('lastName')) {
        setIsSobrenomeValid(false);
      }
      if (validaSubmit.includes('email')) {
        setIsEmailValid(false);
      }
      if (validaSubmit.includes('phone')) {
        setIsTelefoneValid(false);
      }
      if (validaSubmit.includes('registration')) {
        setIsMatriculaValid(false);
      }
      if (validaSubmit.includes('password')) {
        setIsPasswordValid(false);
      }
      if (validaSubmit.includes('username')) {
        setIsUserNameValid(false);
      }
      if (validaSubmit.includes('cpf')) {
        setIsCpfValid(false);
      }
      return;
    }

    if (
      !isCpfValid ||
      !isEmailValid ||
      !isMatriculaValid ||
      !isPasswordValid ||
      !isNameValid ||
      !isSobrenomeValid ||
      !isTelefoneValid ||
      !isUserNameValid
    )
      return;

    alertRequest(
      'Cadastrar',
      'Deseja realmente cadastrar este usuário?',
      async () => {
        setLoading(true);

        user.createdAt = new Date();

        const result: any = await userController.post(usuario);
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Sucesso ao cadastrar este usuário!',
          result.errorMessage,
          'ListUsers',
        );
      },
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Pressable onPress={updatePhoto} style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={{
              uri: usuario.image
                ? `data:${usuario.image.type};base64,${usuario.image.base64}`
                : '',
            }}
          />
          <Icon style={styles.editIcon} name="camera" />
        </Pressable>
      </View> */}
      <InputComponent
        label="Nome"
        inputStyle={[
          isNameValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        value={usuario.name}
        onChangeText={text => {
          setIsNameValid(true);
          setUsuario({...usuario, name: text});
        }}
        onBlur={() => {
          if (!userValidator.validateEmptyString(usuario.name)) {
            setIsNameValid(false);
          }
        }}
      />
      <InputComponent
        label="Sobrenome"
        inputStyle={[
          isSobrenomeValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        value={usuario.lastName}
        onChangeText={text => {
          setIsSobrenomeValid(true);
          setUsuario({...usuario, lastName: text});
        }}
        onBlur={() => {
          if (!userValidator.validateEmptyString(usuario.lastName)) {
            setIsSobrenomeValid(false);
          }
        }}
      />
      <InputComponent
        label="Telefone"
        inputStyle={[
          isTelefoneValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        inputMode="tel"
        value={usuario.phone}
        maxLength={9}
        onChangeText={text => {
          setIsTelefoneValid(true);
          setUsuario({...usuario, phone: text});
        }}
        onBlur={() => {
          if (
            !userValidator.validateEmptyString(usuario.phone) ||
            !userValidator.validatePhoneNumber(usuario.phone)
          ) {
            setIsTelefoneValid(false);
          }
        }}
      />
      <InputComponent
        label="Email"
        inputStyle={[
          isEmailValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        inputMode="email"
        value={usuario.email}
        onChangeText={text => {
          setIsEmailValid(true);
          setUsuario({...usuario, email: text});
        }}
        onBlur={() => {
          if (
            !userValidator.validateEmptyString(usuario.email) ||
            !userValidator.validateEmail(usuario.email)
          ) {
            setIsEmailValid(false);
          }
        }}
      />
      <InputComponent
        label="CPF"
        value={usuario.cpf}
        keyboardType="number-pad"
        inputStyle={[
          isCpfValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        maxLength={11}
        onChangeText={text => {
          setIsCpfValid(true);
          setUsuario({...usuario, cpf: text});
        }}
        onBlur={() => {
          if (
            !userValidator.validateEmptyString(usuario.cpf) ||
            !userValidator.validateCPF(usuario.cpf)
          ) {
            setIsCpfValid(false);
          }
        }}
      />
      <InputComponent
        label="Matrícula"
        value={usuario.registration}
        inputStyle={[
          isMatriculaValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        onChangeText={text => {
          setIsMatriculaValid(true);
          setUsuario({...usuario, registration: text});
        }}
        onBlur={() => {
          if (!userValidator.validateEmptyString(usuario.registration)) {
            setIsMatriculaValid(false);
          }
        }}
      />
      <InputComponent
        label="UserName"
        value={usuario.username}
        inputStyle={[
          isUserNameValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        onChangeText={text => {
          setIsUserNameValid(true);
          setUsuario({...usuario, username: text});
        }}
        onBlur={() => {
          if (!userValidator.validateEmptyString(usuario.username)) {
            setIsUserNameValid(false);
          }
        }}
      />
      <InputComponent
        label="Senha"
        value={usuario.password}
        secureTextEntry={!showPassword}
        inputStyle={[
          isPasswordValid ? styles.isValid : styles.isRequired,
          styles.inputWidth,
        ]}
        labelStyle={styles.labelMargin}
        onChangeText={text => {
          setUsuario({...usuario, password: text});
          setIsPasswordValid(true);

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
        }}
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
        onBlur={() => {
          if (
            !userValidator.validateEmptyString(usuario.password) ||
            !userValidator.validatePassword(usuario.password)
          ) {
            setIsPasswordValid(false);
          }
        }}
      />

      <View style={styles.validationsLabel}>
        <Text
          style={[
            styles.validationLabel,
            isLengthValid ? styles.validationLabelValid : null,
          ]}>
          - A senha deve ter entre 10 e 20 caracteres.
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isUpperCaseValid ? styles.validationLabelValid : null,
          ]}>
          - A senha deve conter pelo menos uma letra maiúscula (A-Z).
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isLowerCaseValid ? styles.validationLabelValid : null,
          ]}>
          - A senha deve conter pelo menos uma letra minúscula (a-z).
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isDigitValid ? styles.validationLabelValid : null,
          ]}>
          - A senha deve conter pelo menos um número (0-9).
        </Text>
        <Text
          style={[
            styles.validationLabel,
            isSymbolValid ? styles.validationLabelValid : null,
          ]}>
          - A senha deve conter pelo menos um dos símbolos: !, @, #, $ ou _.
        </Text>
      </View>

      <View style={styles.pressableContainer}>
      <PressableButton
          children="Confirmar"
          textStyle={styles.enterButton}
          onPress={handleRegister}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    fontSize: 20,
    color: '#FFFFFF',
  },
  userImageContainer: {
    width: 100,
    height: 100,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputWidth: {
    width: '93%',
  },
  labelMargin: {
    marginLeft: 15,
  },
  pressableContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  enterButton: {
    backgroundColor: '#77A490',
    width: 200,
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: '#858585',
    width: 200,
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
    zIndex: 2
  },
  isRequired: {
    borderColor: 'red',
    borderWidth: 0.5,
    borderRadius: 5,
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
    alignSelf: 'center'
  }
});

export default RegisterUser;

import React, {useContext} from 'react';
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
import {userValidator} from '../../../helpers/validators';
import {
  alertRequest,
  alertResult,
  requestReadImages,
  updateUserImage,
} from '../../../helpers/utils';
import {userController} from '../../../services';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {User} from '../../../helpers/models';

function UserInfo({navigation, route}) {
  const {user, updateUser} = useContext(AuthContext);
  const usuarioInfo: User = route.params;

  if (!user) {
    navigation.navigate('Home');

    return;
  }

  if (!usuarioInfo.image) usuarioInfo.image = undefined;

  const {isLoading, setLoading} = useContext(LoadContext);

  const [usuario, setUsuario] = React.useState(usuarioInfo);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isSobrenomeValid, setIsSobrenomeValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isTelefoneValid, setIsTelefoneValid] = React.useState(true);
  const [isMatriculaValid, setIsMatriculaValid] = React.useState(true);
  const [isUserNameValid, setIsUserNameValid] = React.useState(true);
  const [isCpfValid, setIsCpfValid] = React.useState(true);

  const updatePhoto = async () => {
    if (isLoading) return;

    try {
      const hasPermissionReadImages = await requestReadImages();

      if (hasPermissionReadImages) {
        await updateUserImage(usuario, setUsuario);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    const validaSubmit = userValidator.validateUser(usuario);

    if (validaSubmit) {
      if (validaSubmit.includes('name')) {
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
      if (validaSubmit.includes('username')) {
        setIsUserNameValid(false);
      }
      if (validaSubmit.includes('cpf')) {
        setIsCpfValid(false);
      }
    }

    if (
      !isCpfValid ||
      !isEmailValid ||
      !isMatriculaValid ||
      !isNameValid ||
      !isSobrenomeValid ||
      !isTelefoneValid ||
      !isUserNameValid
    ) {
      return;
    }

    alertRequest(
      'Cadastrar',
      'Deseja realmente atualizar este usuário?',
      async () => {
        setLoading(true);

        const result: any = await userController.update(usuario._id, usuario);
        setLoading(false);

        if (result.errorMessage !== null && user._id === usuario._id) {
          updateUser(usuario);
        }

        alertResult(
          result.errorMessage == null,
          'Sucesso ao atualizar este usuário!',
          result.errorMessage,
          'ListUsers',
        );
      },
    );
  };

  const handleDelete = () => {
    if (isLoading) return;

    alertRequest(
      'Deletar',
      'Deseja realmente deletar este usuário?',
      async () => {
        setLoading(true);
        const result: any = await userController.delete(usuario._id ?? '');
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Usuário deletado com sucesso!',
          result.errorMessage,
          'ListUsers',
        );
      },
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={updatePhoto} style={styles.userImageContainer}>
          {usuario.image !== undefined && usuario.image && (
            <Image
              style={styles.userImage}
              source={{
                uri: `data:${usuario.image.type};base64,${usuario.image.base64}`,
              }}
            />
          )}
          <Icon style={styles.editIcon} name="camera" />
        </Pressable>
      </View>
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
        maxLength={11}
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
        keyboardType="numeric"
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
      <View style={styles.pressableContainer}>
        <PressableButton
          children="Confirmar"
          textStyle={styles.confirmButton}
          onPress={handleRegister}
          disabled={isLoading}
        />
        {usuario._id === user._id ? (
          <></>
        ) : (
          <PressableButton
            children="Deletar"
            textStyle={styles.deleteButton}
            onPress={handleDelete}
            disabled={isLoading}
          />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  confirmButton: {
    backgroundColor: '#77A490',
    fontSize: 20,
    width: 150,
  },
  deleteButton: {
    backgroundColor: '#e03232',
    width: 150,
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
});

export default UserInfo;

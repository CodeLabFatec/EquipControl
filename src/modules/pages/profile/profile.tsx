import React, {useContext, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {AuthContext, LoadContext} from '../../../contexts';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import {userValidator} from '../../../helpers/validators';
import {
  alertError,
  alertRequest,
  alertResult,
  requestReadImages,
  updateUserImage,
} from '../../../helpers/utils';
import {userController} from '../../../services';
import Icon from 'react-native-vector-icons/FontAwesome5';

function ProfilePage({navigation}) {
  const {user, updateUser, logout} = useContext(AuthContext);

  if (!user) {
    navigation.navigate('Home');

    return <></>;
  }

  const [usuario, setUsuario] = useState(user);
  const {isLoading, setLoading} = useContext(LoadContext);

  const changeUser = () => {
    if (isLoading) return;
    const validation = userValidator.validateEquipment(usuario);

    if (validation) {
      alertError(`O campo ${validation} é obrigatório!`);
      return;
    }

    alertRequest(
      'Alterar',
      'Deseja realmente alterar seu usuário?',
      async () => {
        setLoading(true);
        const result = await userController.update(usuario._id, usuario);

        setLoading(false);
        updateUser(usuario);
        alertResult(
          result.errorMessage == null,
          'Sucesso ao alterar seu usuário!',
          result.errorMessage,
          'Home',
        );
      },
    );
  };

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
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
      </View>
      <InputComponent
        label="Nome"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        value={usuario.name}
        onChangeText={text => setUsuario({...usuario, name: text})}
      />
      <InputComponent
        label="Sobrenome"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        value={usuario.lastName}
        onChangeText={text => setUsuario({...usuario, lastName: text})}
      />
      <InputComponent
        label="Email"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        value={usuario.email}
        onChangeText={text => setUsuario({...usuario, email: text})}
      />
      <InputComponent
        label="Telefone"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        value={usuario.phone}
        onChangeText={text => setUsuario({...usuario, phone: text})}
      />
      <InputComponent
        label="Matrícula"
        value={usuario.registration}
        editable={false}
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        onChangeText={text => setUsuario({...usuario, registration: text})}
      />

      <View style={styles.pressableContainer}>
        <PressableButton
          pressableStyle={styles.enterButton}
          onPress={changeUser}
          disabled={isLoading}>
          Salvar
        </PressableButton>
        <PressableButton onPress={logout} pressableStyle={styles.logoutButton}>
          Sair
        </PressableButton>
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
});

export default ProfilePage;

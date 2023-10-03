import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {equipmentController} from '../../services';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '../components/carousel';
import {defaultEquipment, equipmentValidator} from '../../helpers/validators';
import {requestReadImages, updateEquipamentoImages} from '../../helpers/utils';
import {LoadContext} from '../../contexts';

function EquipmentRegister({navigation}) {
  const {setLoading} = useContext(LoadContext);
  const [equipamento, setEquipamento] = React.useState(defaultEquipment);
  const [indexImage, setIndexImage] = useState(0);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isDominioValid, setIsDominioValid] = React.useState(true);
  const [isSerialValid, setIsSerialValid] = React.useState(true);
  const [isLongitudeValid, setIsLongitudeValid] = React.useState(true);
  const [isLatitudeValid, setIsLatitudeValid] = React.useState(true);

  const openImagePicker = async () => {
    try {
      const hasPermissionReadImages = await requestReadImages();

      if (hasPermissionReadImages) {
        await updateEquipamentoImages(equipamento, setEquipamento);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = () => {
    const imagensAtualizadas = equipamento.files;
    if (imagensAtualizadas) {
      imagensAtualizadas.splice(indexImage, 1);
      setEquipamento({...equipamento, files: imagensAtualizadas});
    }
  };

  const handleRegister = () => {
    const validaSubmit = equipmentValidator.validateEquipment(equipamento);

    if (validaSubmit) {
      if (validaSubmit.includes('name')) {
        setIsNameValid(false);
      }
      if (validaSubmit.includes('domain')) {
        setIsDominioValid(false);
      }
      if (validaSubmit.includes('serial')) {
        setIsSerialValid(false);
      }
      if (validaSubmit.includes('longitude')) {
        setIsLongitudeValid(false);
      }
      if (validaSubmit.includes('latitude')) {
        setIsLatitudeValid(false);
      }
      return;
    }

    if (
      !isDominioValid ||
      !isLatitudeValid ||
      !isLatitudeValid ||
      !isLongitudeValid ||
      !isNameValid ||
      !isSerialValid
    )
      return;

    Alert.alert('Cadastrar', 'Deseja realmente cadastrar este equipamento?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          const result: any = await equipmentController.post(equipamento);
          setLoading(false);

          Alert.alert(
            result.errorMessage ? 'Erro' : 'Sucesso',
            result.errorMessage
              ? result.errorMessage
              : 'Sucesso ao cadastrar este equipamento.',
            [
              {
                text: 'Ok',
                style: 'default',
                onPress: () => {
                  if (!result.errorMessage) navigation.navigate('Home');
                },
              },
            ],
          );
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.equipment}>
          {equipamento.files && equipamento.files.length > 0 ? (
            <Carousel
              width={290}
              files={equipamento.files}
              index={indexImage}
              setIndex={setIndexImage}
            />
          ) : (
            <View style={styles.fileIconContainer}>
              <Icon style={styles.fileIcon} name="file-image" />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable>
            <Icon
              style={styles.addIcon}
              onPress={openImagePicker}
              name="plus-circle"
            />
          </Pressable>
          <Pressable>
            <Icon
              style={styles.removeIcon}
              onPress={removeImage}
              name="minus-circle"
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Nome:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Nome do equipamento"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => {
              setIsNameValid(true);
              setEquipamento({...equipamento, name: text});
            }}
            value={equipamento.name}
            style={[
              isNameValid ? styles.isValid : styles.isRequired,
              styles.inputField,
            ]}
            onBlur={() => {
              if (!equipmentValidator.validateEmptyString(equipamento.name)) {
                setIsNameValid(false);
              }
            }}
          />
        </View>
        <Text style={styles.inputLabel}>Domínio:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Domínio do equipamento"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => {
              setIsDominioValid(true);
              setEquipamento({...equipamento, domain: text});
            }}
            value={equipamento.domain}
            style={[
              isDominioValid ? styles.isValid : styles.isRequired,
              styles.inputField,
            ]}
            onBlur={() => {
              if (!equipmentValidator.validateEmptyString(equipamento.domain)) {
                setIsDominioValid(false);
              }
            }}
          />
        </View>
        <Text style={styles.inputLabel}>Serial:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Serial"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => {
              setIsSerialValid(true);
              setEquipamento({...equipamento, serial: text});
            }}
            value={equipamento.serial}
            style={[
              isSerialValid ? styles.isValid : styles.isRequired,
              styles.inputField,
            ]}
            onBlur={() => {
              if (!equipmentValidator.validateEmptyString(equipamento.serial)) {
                setIsSerialValid(false);
              }
            }}
          />
        </View>
        <Text style={styles.inputLabel}>Latitude e Longitude:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Latitude"
            keyboardType="number-pad"
            placeholderTextColor={'#E2D7C1'}
            maxLength={10}
            onChangeText={text => {
              setIsLatitudeValid(true);
              setEquipamento({...equipamento, latitude: text});
            }}
            value={equipamento.latitude}
            style={[
              isLatitudeValid ? styles.isValid : styles.isRequired,
              styles.latitudeEquipmentInput,
            ]}
            onBlur={() => {
              if (!equipmentValidator.validateLatitude(equipamento.latitude))
                setIsLatitudeValid(false);
            }}
          />
          <TextInput
            placeholder="Longitude"
            keyboardType="number-pad"
            placeholderTextColor={'#E2D7C1'}
            maxLength={12}
            onChangeText={text => {
              setIsLongitudeValid(true);
              setEquipamento({...equipamento, longitude: text});
            }}
            value={equipamento.longitude}
            style={[
              isLongitudeValid ? styles.isValid : styles.isRequired,
              styles.longitudeEquipmentInput,
            ]}
            onBlur={() => {
              if (!equipmentValidator.validateLongitude(equipamento.longitude))
                setIsLongitudeValid(false);
            }}
          />
        </View>
        <Text style={styles.inputLabel}>Observações:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Observação"
            scrollEnabled={true}
            placeholderTextColor={'#E2D7C1'}
            multiline={true}
            numberOfLines={7}
            onChangeText={text => setEquipamento({...equipamento, notes: text})}
            value={equipamento.notes}
            style={styles.observationEquipmentInput}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.confirmButton} onPress={handleRegister}>
          <Text style={styles.confirmText}>Cadastrar Equipamento</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 55,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
  },
  equipment: {
    width: '80%',
    height: 220,
    zIndex: 1,
    borderColor: '#E2D7C1',
    borderWidth: 1,
    borderRadius: 2,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
    alignItems: 'flex-end',
    paddingRight: 15,
  },

  inputLabel: {
    paddingLeft: 7,
    color: '#fff',
  },

  equipmentName: {
    color: '#fff',
  },

  fileIcon: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },

  fileIconContainer: {
    marginHorizontal: 'auto',
    paddingVertical: 95,
  },

  addIcon: {
    fontSize: 38,
    color: '#77A490',
  },

  removeIcon: {
    fontSize: 38,
    color: 'gray',
    marginTop: 5,
  },

  formContainer: {
    width: '100%',
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
    marginTop: 5,
  },

  inputField: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '96%',
  },

  dataEquipmentInput: {
    backgroundColor: '#363636',
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '96%',
  },

  observationEquipmentInput: {
    backgroundColor: '#363636',
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '96%',
    textAlignVertical: 'top',
  },

  longitudeEquipmentInput: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '46%',
    marginLeft: '4%',
  },
  latitudeEquipmentInput: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '46%',
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    marginTop: 5,
  },

  activeButton: {
    backgroundColor: '#77A490',
    width: '46%',
    height: 50,
    marginTop: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },

  disableButton: {
    backgroundColor: 'gray',
    width: '46%',
    height: 50,
    marginTop: 5,
    borderRadius: 10,
    marginLeft: '4%',
    justifyContent: 'center',
  },

  activeText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#EEEEEE',
  },

  disableText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#EEEEEE',
  },

  confirmButton: {
    backgroundColor: '#77A490',
    width: '96%',
    height: 50,
    marginTop: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },

  confirmText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#EEEEEE',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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

export default EquipmentRegister;

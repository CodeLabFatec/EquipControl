import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Equipment} from '../../helpers/models';
import Carousel from '../components/carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {equipmentController} from '../../services';
import {equipmentValidator} from '../../helpers/validators';
import {requestReadImages, updateEquipamentoImages} from '../../helpers/utils';

function EquipmentInfo({navigation, route}) {
  const equipment: Equipment = route.params;

  if (!equipment) {
    navigation.navigate('Home');
    return;
  }

  const [equipamento, setEquipamento] = React.useState(equipment);
  const [loading, setLoading] = React.useState(false);
  const [indexImage, setIndexImage] = useState(0);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isDominioValid, setIsDominioValid] = React.useState(true);
  const [isSerialValid, setIsSerialValid] = React.useState(true);
  const [isLongitudeValid, setIsLongitudeValid] = React.useState(true);
  const [isLatitudeValid, setIsLatitudeValid] = React.useState(true);

  const handleActivateButton = () => {
    if (!equipamento.isActive) {
      Alert.alert('Ativar', 'Deseja ativar este equipamento?', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            const result: any = await equipmentController.updateStatus(
              equipamento._id,
              true,
            );
            setLoading(false);

            if (!result.message) {
              setEquipamento({...equipamento, isActive: true});
            }
            Alert.alert(
              result.message ? 'Erro' : 'Sucesso',
              result.message
                ? result.message
                : 'Sucesso ao ativar este equipamento.',
              [
                {
                  text: 'Ok',
                  style: 'default',
                },
              ],
            );
          },
        },
      ]);
    }
  };

  const handleDisableButton = () => {
    if (equipamento.isActive) {
      Alert.alert('Desativar', 'Deseja desativar este equipamento?', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            const result: any = await equipmentController.updateStatus(
              equipamento._id,
              false,
            );
            setLoading(false);

            if (!result.message) {
              setEquipamento({...equipamento, isActive: false});
            }

            Alert.alert(
              result.message ? 'Erro' : 'Sucesso',
              result.message
                ? result.message
                : 'Sucesso ao desativar este equipamento.',
              [
                {
                  text: 'Ok',
                  style: 'default',
                },
              ],
            );
          },
        },
      ]);
    }
  };

  const handleUpdateEquipamento = () => {
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

    Alert.alert('Atualizar', 'Deseja realmente atualizar este equipamento?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          const result: any = await equipmentController.update(
            equipamento._id,
            equipamento,
          );
          setLoading(false);

          Alert.alert(
            result.message ? 'Erro' : 'Sucesso',
            result.message
              ? result.message
              : 'Sucesso ao atualizar este equipamento.',
            [
              {
                text: 'Ok',
                style: 'default',
                onPress: () => {
                  if (!result.message) navigation.navigate('Home');
                },
              },
            ],
          );
        },
      },
    ]);
  };

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

  return (
    <ScrollView style={styles.container}>
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="#77A490" />
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>
        {equipamento.isActive ? (
          <Pressable
            style={[
              styles.isActiveButton,
              {
                backgroundColor: equipamento.isActive ? 'gray' : '#77A490',
              },
            ]}
            disabled={loading}
            aria-disabled={equipamento.isActive}
            onPress={handleDisableButton}>
            <Text style={styles.disableText}>Desativar</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.isActiveButton,
              {
                backgroundColor: equipamento.isActive ? 'gray' : '#77A490',
              },
            ]}
            disabled={loading}
            aria-disabled={!equipamento.isActive}
            onPress={handleActivateButton}>
            <Text style={styles.activeText}>Ativar</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.equipment}>
          {equipment.files && equipment.files.length > 0 ? (
            <Carousel
              width={290}
              files={equipment.files ?? []}
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
          <Pressable onPress={openImagePicker}>
            <Icon style={styles.addIcon} name="plus-circle" />
          </Pressable>
          <Pressable onPress={removeImage}>
            <Icon style={styles.removeIcon} name="minus-circle" />
          </Pressable>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Nome:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Nome do equipamento"
            placeholderTextColor={'#808080'}
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
            placeholderTextColor={'#808080'}
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
            placeholderTextColor={'#808080'}
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
            keyboardType="numeric"
            placeholderTextColor={'#808080'}
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
            keyboardType="numeric"
            placeholderTextColor={'#808080'}
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
            placeholderTextColor={'#808080'}
            multiline={true}
            numberOfLines={7}
            onChangeText={text => setEquipamento({...equipamento, notes: text})}
            value={equipamento.notes}
            style={styles.observationEquipmentInput}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.confirmButton}
          disabled={loading}
          onPress={handleUpdateEquipamento}>
          <Text style={styles.confirmText}>Confirmar</Text>
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
    marginBottom: 5,
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
    color: '#EEEEEE',
    paddingLeft: 7,
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
    marginBottom: 4,
  },
  tipeEquipmentInput: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '60%',
  },
  idEquipmentInput: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '32%',
    marginLeft: '4%',
  },
  inputField: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '96%',
  },
  observationEquipmentInput: {
    backgroundColor: '#363636',
    fontSize: 16,
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
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
  isActiveButton: {
    width: '96%',
    height: 50,
    marginTop: 5,
    borderRadius: 10,
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

export default EquipmentInfo;

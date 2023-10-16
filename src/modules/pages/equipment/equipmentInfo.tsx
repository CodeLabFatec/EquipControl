import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {Domain, Equipment} from '../../../helpers/models';
import Carousel from '../../components/carousel/carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {domainController, equipmentController} from '../../../services';
import {equipmentValidator} from '../../../helpers/validators';
import {
  alertRequest,
  alertResult,
  requestReadImages,
  updateEquipamentoImages,
} from '../../../helpers/utils';
import {LoadContext} from '../../../contexts';
import {PickerComponent} from '../../components/base/picker';
import {PickerItemProps} from '@react-native-picker/picker';

function EquipmentInfo({navigation, route}) {
  const equipment: Equipment = route.params;
  if (!equipment) {
    navigation.navigate('Home');
    return;
  }

  const {isLoading, setLoading} = useContext(LoadContext);

  const [domainOptions, setDomainOptions] = useState<Domain[]>([]);
  const [equipamento, setEquipamento] = useState(equipment);
  const [indexImage, setIndexImage] = useState(0);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDominioValid, setIsDominioValid] = useState(true);
  const [isSerialValid, setIsSerialValid] = useState(true);
  const [isLongitudeValid, setIsLongitudeValid] = useState(true);
  const [isLatitudeValid, setIsLatitudeValid] = useState(true);

  const loadDomains = async () => {
    setLoading(true);
    const result = await domainController.list();
    setDomainOptions(result);
    setLoading(false);
  };

  useEffect(() => {
    loadDomains();
  }, []);

  const handleActivateButton = () => {
    if (equipamento.isActive) return;

    alertRequest('Ativar', 'Deseja ativar este equipamento?', async () => {
      setLoading(true);
      const result: any = await equipmentController.updateStatus(
        equipamento._id,
        true,
      );
      setLoading(false);

      if (!result.errorMessage) {
        setEquipamento({...equipamento, isActive: true});
      }

      alertResult(
        result.errorMessage == null,
        'Sucesso ao ativar este equipamento!',
        result.errorMessage,
      );
    });
  };

  const handleDisableButton = () => {
    if (!equipamento.isActive) return;

    alertRequest(
      'Desativar',
      'Deseja desativar este equipamento?',
      async () => {
        setLoading(true);
        const result: any = await equipmentController.updateStatus(
          equipamento._id,
          false,
        );
        setLoading(false);

        if (!result.errorMessage) {
          setEquipamento({...equipamento, isActive: false});
        }

        alertResult(
          result.errorMessage == null,
          'Sucesso ao desativar este equipamento!',
          result.errorMessage,
        );
      },
    );
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

    alertRequest(
      'Atualizar',
      'Deseja realmente atualizar este equipamento?',
      async () => {
        setLoading(true);
        const result: any = await equipmentController.update(
          equipamento._id,
          equipamento,
        );
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Sucesso ao atualizar este equipamento!',
          result.errorMessage,
          'Home',
        );
      },
    );
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
      <View style={styles.buttonsContainer}>
        {equipamento.isActive ? (
          <Pressable
            style={[
              styles.isActiveButton,
              {
                backgroundColor: equipamento.isActive ? 'gray' : '#77A490',
              },
            ]}
            disabled={isLoading}
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
            disabled={isLoading}
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
          <PickerComponent
            onChange={value => {
              setIsDominioValid(true);
              setEquipamento({
                ...equipamento,
                domain: {_id: value, name: equipamento.domain.name},
              });
            }}
            items={domainOptions.map(
              i => ({value: i._id, label: i.name} as PickerItemProps),
            )}
            value={equipamento.domain._id}
            placeholder="Domínio do equipamento"
            pickerStyle={styles.selectField}
            containerStyle={[
              {width: '96%'},
              isDominioValid ? styles.isValidSelect : styles.isRequiredSelect,
            ]}
            itemStyle={{color: '#E2D7C1'}}
            onBlur={() => {
              if (
                !equipmentValidator.validateEmptyString(equipamento.domain._id)
              ) {
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
          disabled={isLoading}
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
  selectField: {
    backgroundColor: '#363636',
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '100%',
  },
  isRequiredSelect: {
    borderColor: 'red',
    borderWidth: 0.5,
    borderRadius: 2,
  },
  isValidSelect: {
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 2,
  },
});

export default EquipmentInfo;

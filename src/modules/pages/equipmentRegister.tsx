import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Button,
  Image
} from 'react-native';
import { equipmentController } from '../../api';
import { Equipment } from '../../helpers/models';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '../components/carousel';
import { defaultEquipment } from '../../helpers/validators/equipmentValidator';
import ImagePicker from 'react-native-image-crop-picker';

function EquipmentRegister({ navigation }) {
  const [equipamento, setEquipamento] = React.useState(defaultEquipment);

  const [selectedImages, setSelectedImages] = useState([]);

  const pickMultiple = async () => {
    try {
      const images = await ImagePicker.openPicker({
        width: 150, // Defina a largura desejada para redimensionar a imagem
        height: 150, // Defina a altura desejada para redimensionar a imagem
        cropping: true,
        multiple: true,
        includeBase64: true,
        mediaType: 'photo'
      });
      setSelectedImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = (index) => {
    const imagensAtualizadas = [...selectedImages];
    imagensAtualizadas.splice(index, 2); // Remove a imagem do array
    setSelectedImages(imagensAtualizadas); // Atualiza o estado com o novo array
  };

  const handleUpdateEquipamento = () => {
    Alert.alert('Atualizar', 'Deseja realmente atualizar este equipamento?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          equipmentController.update(equipamento);
          Alert.alert('Sucesso', 'Sucesso ao atualizar este equipamento.', [
            {
              text: 'Ok',
              style: 'default',
            },
          ]);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.equipment}>
          {equipamento.files && equipamento.files.length > 0 ? (
            <Carousel files={equipamento.files} />
          ) : (
            selectedImages.map((image, index) => (
                <Image resizeMode='contain' source={{ uri: image.path }} key={index} style={{width: '100%', height: '100%'}}/>
            ))
          )}
        </View>
        <View style={styles.buttonContainerImage}>
          <View style={styles.buttonContainer}>
            <Button title="Adicionar Imagens" onPress={pickMultiple} color='#77A490' />
            <Button title="Remover Imagens" onPress={removeImage} color='#aa0000' />
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Nome:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Nome do equipamento"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => setEquipamento({ ...equipamento, name: text })}
            value={equipamento.name}
            style={styles.serialEquipmentInput}
          />
        </View>
        <Text style={styles.inputLabel}>Domínio:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Domínio do equipamento"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            aria-disabled
            onChangeText={text =>
              setEquipamento({ ...equipamento, domain: text })
            }
            value={equipamento._id}
            style={styles.serialEquipmentInput}
          />
        </View>
        <Text style={styles.inputLabel}>Serial:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Serial"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text =>
              setEquipamento({ ...equipamento, serial: text })
            }
            value={equipamento.serial}
            style={styles.serialEquipmentInput}
          />
        </View>
        <Text style={styles.inputLabel}>Latitude e Longitude:</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Latitude"
            keyboardType="numeric"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text =>
              setEquipamento({ ...equipamento, latitude: Number(text) })
            }
            value={equipamento.latitude + ''}
            style={styles.latitudeEquipmentInput}
          />
          <TextInput
            placeholder="Longitude"
            keyboardType="numeric"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text =>
              setEquipamento({ ...equipamento, longitude: Number(text) })
            }
            value={equipamento.longitude + ''}
            style={styles.longitudeEquipmentInput}
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
            onChangeText={text => setEquipamento({ ...equipamento, notes: text })}
            value={equipamento.notes}
            style={styles.observationEquipmentInput}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.confirmButton}
          onPress={handleUpdateEquipamento}>
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
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  equipment: {
    width: '80%',
    height: 220,
    zIndex: 1,
    borderColor: '#E2D7C1',
    borderWidth: 1,
    borderRadius: 2,
  },

  buttonContainerImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%',
    padding: 10,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    gap: 20,
  },

  inputLabel: {
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

  tipeEquipmentInput: {
    backgroundColor: '#363636',
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '60%',
  },

  idEquipmentInput: {
    backgroundColor: '#363636',
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '32%',
    marginLeft: '4%',
  },

  serialEquipmentInput: {
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
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    color: '#E2D7C1',
    padding: 6,
    width: '46%',
    marginLeft: '4%',
  },

  latitudeEquipmentInput: {
    backgroundColor: '#363636',
    borderColor: '#E2D7C1',
    borderWidth: 0.5,
    borderRadius: 5,
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
});

export default EquipmentRegister;

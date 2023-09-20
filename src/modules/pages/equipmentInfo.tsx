import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {Equipment} from '../../helpers/models';
import Carousel from '../components/carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';

function EquipmentInfo({navigation, route}) {
  const equipment: Equipment = route.params;
  const [value, onChangeText] = React.useState('');

  if (!equipment) {
    navigation.navigate('Home');
    return;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.equipment}>
          {equipment.files && equipment.files.length > 0 ? (
            <Carousel files={equipment.files ?? []} />
          ) : (
            <View>
              <Icon style={styles.fileIcon} name="file-image" />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable>
            <Icon style={styles.addIcon} name="plus-circle" />
          </Pressable>
          <Pressable>
            <Icon style={styles.removeIcon} name="minus-circle" />
          </Pressable>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Nome do equipamento"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.tipeEquipmentInput}
          />
          <TextInput
            placeholder="ID"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.idEquipmentInput}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Serial"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.serialEquipmentInput}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Latitude"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.latitudeEquipmentInput}
          />
          <TextInput
            placeholder="Longitude"
            placeholderTextColor={'#E2D7C1'}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.longitudeEquipmentInput}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Observação"
            scrollEnabled={true}
            placeholderTextColor={'#E2D7C1'}
            multiline={true}
            numberOfLines={10}
            // onChangeText={text => this.setState({text})}
            // value={this.state.text}
            style={styles.observationEquipmentInput}
          />
        </View>
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
    height: 200,
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
    color: '#f56218',
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
    marginTop: 5
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
});

export default EquipmentInfo;

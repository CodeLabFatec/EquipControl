import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {defaultDomain, domainValidator} from '../../../helpers/validators/domainValidator';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';

function DomainRegister({navigation}) {
  const [domain, setDomain] = React.useState(defaultDomain);
    const [isNameValid, setIsNameValid] = React.useState(true);

    const handleRegister = () => {
      const validaSubmit = domainValidator.validateDomain(domain);
  
      if (validaSubmit) {
        if (validaSubmit.includes('name')) {
          setIsNameValid(false);
        }
        }
        return;
      }
  
      if (
        !isNameValid 
      )
        return;
  
    return (
      <View style={styles.container}>
        <InputComponent
          label="Nome"
          inputStyle={styles.inputWidth}
          labelStyle={styles.labelMargin}
          placeholder="Nome do Domínio"
          onChangeText={text => {
            setIsNameValid(true);
            setDomain({...domain, name: text});
          }}
          value={domain.name}
          onBlur={() => {
            if (!domainValidator.validateEmptyString(domain.name)) {
              setIsNameValid(false);
            }
          }}
        />

        <PressableButton
          children="Cadastrar Domínio"
          pressableStyle={styles.pressableContainer}
          textStyle={styles.confirmButton}
          onPress={handleRegister}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: '5%',
      justifyContent: 'center',
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
    },
    confirmButton: {
      backgroundColor: '#77A490',
      width: '93%',
      fontSize: 20,
    },
  });
  
  export default DomainRegister;

 
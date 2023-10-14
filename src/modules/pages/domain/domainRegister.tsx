import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import {defaultDomain, domainValidator} from '../../../helpers/validators/domainValidator';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import { alertRequest, alertResult } from '../../../helpers/utils';
import { LoadContext } from '../../../contexts';
import { domainController } from '../../../services';

function DomainRegister({navigation}) {
    const { isLoading, setLoading } = useContext(LoadContext)
    const [domain, setDomain] = React.useState(defaultDomain);
    const [isNameValid, setIsNameValid] = React.useState(true);

    const handleRegister = () => {
      if(isLoading) return

      const validaSubmit = domainValidator.validateDomain(domain);
  
      if (validaSubmit && validaSubmit.includes('name')){
        setIsNameValid(false);
        return
      } 
      if (!isNameValid) return;

      alertRequest(
        'Cadastrar',
        'Deseja realmente cadastrar este equipamento?',
        async () => {
          setLoading(true);
  
          const result: any = await domainController.post(domain);
          setLoading(false);
  
          alertResult(
            result.errorMessage == null,
            'Sucesso ao cadastrar este domínio!',
            result.errorMessage,
            'ListDomain',
          );
        },
      );
    }
  
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
          disabled={isLoading}
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

 
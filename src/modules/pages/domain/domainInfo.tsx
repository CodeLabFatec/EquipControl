import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { defaultDomain, domainValidator } from '../../../helpers/validators/domainValidator';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import {
  alertRequest,
  alertResult,
} from '../../../helpers/utils';
import { LoadContext } from '../../../contexts';
import { domainController } from '../../../services';


function DomainInfo({ navigation }) {
  const [domain, setDomain] = React.useState(defaultDomain);
  const [isNameValid, setIsNameValid] = useState(true);

  const { isLoading, setLoading } = useContext(LoadContext);

  const handleUpdateDomain = () => {
    const validaSubmit = domainValidator.validateDomain(domain);

    if (validaSubmit) {
      if (validaSubmit.includes('name')) {
        setIsNameValid(false);
      }

      return;
    }

    if (

      !isNameValid

    )
      return;

    alertRequest(
      'Atualizar',
      'Deseja realmente atualizar este domínio?',
      async () => {
        setLoading(true);
        const result: any = await domainController.update(
          domain.name,
          domain,
        );
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Sucesso ao atualizar este domínio!',
          result.errorMessage,
          'Home',
        );
      },
    );
  };

  const handleDeleteDomain = () => {
    const validaSubmit = domainValidator.validateDomain(domain);

    if (validaSubmit) {
      if (validaSubmit.includes('name')) {
        setIsNameValid(false);
      }

      return;
    }

    if (

      !isNameValid

    )
      return;

    alertRequest(
      'Atualizar',
      'Deseja realmente deletar este domínio?',
      async () => {
        setLoading(true);
        const result: any = await domainController.delete(
          domain.name,
        );
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Domínio deletado com sucesso!',
          result.errorMessage,
          'Home',
        );
      },
    );
  };

  return (
    <View style={styles.container}>

      <PressableButton
        children="Deletar Domínio"
        pressableStyle={styles.pressableContainer}
        textStyle={styles.deleteButton}
        onPress={handleDeleteDomain}
      />
      <InputComponent
        label="Nome"
        inputStyle={styles.inputWidth}
        labelStyle={styles.labelMargin}
        placeholder="Nome do Domínio"
        onChangeText={text => {
          setIsNameValid(true);
          setDomain({ ...domain, name: text });
        }}
        value={domain.name}
        onBlur={() => {
          if (!domainValidator.validateEmptyString(domain.name)) {
            setIsNameValid(false);
          }
        }}
      />

      <PressableButton
        children="Atualizar Domínio"
        pressableStyle={styles.pressableContainer}
        textStyle={styles.confirmButton}
        onPress={handleUpdateDomain}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '60%',
    marginBottom: 50,
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
    marginTop: '2%',
    fontSize: 20,
  },

  deleteButton: {
    backgroundColor: '#e03232',
    width: '93%',
    marginTop: '3%',
    fontSize: 20,
  },
});

export default DomainInfo;
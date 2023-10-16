import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {domainValidator} from '../../../helpers/validators/domainValidator';
import InputComponent from '../../components/base/inputComponent';
import PressableButton from '../../components/base/pressableButton';
import {alertRequest, alertResult} from '../../../helpers/utils';
import {LoadContext} from '../../../contexts';
import {domainController} from '../../../services';
import {Domain} from '../../../helpers/models';

function DomainInfo({navigation, route}) {
  const dominio: Domain = route.params;

  if (!dominio) {
    navigation.navigate('ListDomain');
    return;
  }

  const [domain, setDomain] = useState(dominio);
  const [isNameValid, setIsNameValid] = useState(true);

  const {isLoading, setLoading} = useContext(LoadContext);

  const handleUpdateDomain = () => {
    if (isLoading) return;

    const validaSubmit = domainValidator.validateDomain(domain);

    if (validaSubmit && validaSubmit.includes('name')) {
      setIsNameValid(false);
      return;
    }
    if (!isNameValid) return;

    alertRequest(
      'Cadastrar',
      'Deseja realmente atualizar este domínio?',
      async () => {
        setLoading(true);

        const result: any = await domainController.update(
          domain._id ?? '',
          domain,
        );
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Sucesso ao atualizar este domínio!',
          result.errorMessage,
          'ListDomain',
        );
      },
    );
  };

  const handleDeleteDomain = () => {
    if (isLoading) return;

    alertRequest(
      'Deletar',
      'Deseja realmente deletar este domínio?',
      async () => {
        setLoading(true);
        const result: any = await domainController.delete(domain._id ?? '');
        setLoading(false);

        alertResult(
          result.errorMessage == null,
          'Domínio deletado com sucesso!',
          result.errorMessage,
          'ListDomain',
        );
      },
    );
  };

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

      <View style={styles.pressableContainer}>
        <PressableButton
          children="Confirmar"
          textStyle={styles.confirmButton}
          onPress={handleUpdateDomain}
          disabled={isLoading}
        />
        <PressableButton
          children="Deletar"
          textStyle={styles.deleteButton}
          onPress={handleDeleteDomain}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default DomainInfo;

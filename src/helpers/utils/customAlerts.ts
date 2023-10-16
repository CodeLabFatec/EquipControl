import {Alert} from 'react-native';
import navigate from '../../RootNavigation';

const alertError = (message: string) => {
  Alert.alert('Erro', message, [
    {
      text: 'Ok',
      style: 'default',
    },
  ]);
};

const alertResult = (
  isSuccessful: boolean,
  successMessage?: string,
  errorMessage?: string,
  route?: string,
) => {
  Alert.alert(
    `${isSuccessful ? 'Sucesso' : 'Erro'}`,
    `${isSuccessful ? successMessage : errorMessage}`,
    [
      {
        text: 'Ok',
        style: 'default',
        onPress: () => {
          if (isSuccessful && route) navigate(route);
        },
      },
    ],
  );
};

const alertRequest = (
  title: string,
  message: string,
  onConfirm: () => void,
) => {
  Alert.alert(title, message, [
    {
      text: 'Não',
      style: 'cancel',
    },
    {
      text: 'Sim',
      onPress: onConfirm,
    },
  ]);
};

export {alertError, alertRequest, alertResult};

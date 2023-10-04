import {Alert} from 'react-native';

const alertError = (message: string) => {
  Alert.alert('Erro', message, [
    {
      text: 'Ok',
      style: 'default',
    },
  ]);
};

export {alertError};

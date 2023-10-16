import {PermissionsAndroid} from 'react-native';
import {Equipment, User} from '../models';
import ImagePicker from 'react-native-image-crop-picker';
import {Files} from '../models';

async function requestReadImages(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Permissão para abrir seus arquivos?',
        message:
          'Para selecionar uma foto precisamos da sua permissão para abrir os arquivos do dispositivo.',
        buttonNeutral: 'Me pergunte depois',
        buttonNegative: 'Negar',
        buttonPositive: 'Aceitar',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
}

async function updateEquipamentoImages(
  equipment: Equipment,
  setEquipment: React.Dispatch<React.SetStateAction<Equipment>>,
) {
  const selectedImages = await ImagePicker.openPicker({
    width: 150,
    height: 150,
    cropping: true,
    multiple: true,
    includeBase64: true,
    mediaType: 'photo',
  });
  const images: Files[] = equipment.files ? equipment.files : [];
  selectedImages.forEach(item => {
    const img: Files = {
      base64: item.data ?? '',
      type: item.mime,
    };

    images.push(img);
  });

  setEquipment({...equipment, files: images});
}

async function updateUserImage(
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
) {
  const selectedImages = await ImagePicker.openPicker({
    width: 150,
    height: 150,
    cropping: true,
    multiple: false,
    includeBase64: true,
    mediaType: 'photo',
  });

  if (!selectedImages) return;

  const image: Files = {
    base64: selectedImages.data ?? '',
    type: selectedImages.mime,
  };

  setUser({...user, image});
}

export {requestReadImages, updateEquipamentoImages, updateUserImage};

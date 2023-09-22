import {Equipment, Files} from '@/helpers/models';
import {api, endpoints} from './api';
import {file1, file2} from './files';

class EquipmentController {
  private array: Equipment[] = [];

  public getEquipment = async (): Promise<Equipment[] | undefined> => {
    return [];
  };

  public postEquipment = async (data: Equipment) => {
    const result = await api.post(endpoints.POST_EQUIPMENT, data);

    return result;
  };

  public update = (equipment: Equipment) => {
    const eqArray = this.array.find(r => r._id === equipment._id);

    if (eqArray) {
      const index = this.array.indexOf(eqArray);
      this.array[index] = equipment;
      console.log(`equipamento ${index} atualizado`);
    }
  };

  public list = () => {
    console.log('buscando lista');
    if (this.array.length == 0) {
      for (let i = 0; i < 20; i++) {
        const equipment: Equipment = {
          domain: 'Poste',
          state: true,
          files: i % 2 == 0 ? [] : [file1, file2],
          latitude: 1,
          longitude: 1,
          name: `Poste #${i}`,
          notes: 'Poste de Teste',
          serial: `${i * 9}-${i * 3}`,
          _id: i + '',
        };

        this.array.push(equipment);
      }
      console.log('nova lista');
    }

    return this.array;
  };
}

const equipmentController = new EquipmentController();

export default equipmentController;

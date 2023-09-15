import {Equipment} from '@/helpers/models';
import {api, endpoints} from './api';

class EquipmentController {
  public getEquipment = async (): Promise<Equipment | undefined> => {
    const result = await api.get(endpoints.GET_EQUIPMENT + '');
    if (!result) return undefined;

    return result as unknown as Equipment;
  };

  public postEquipment = async (data: Equipment) => {
    const result = await api.post(endpoints.POST_EQUIPMENT, data);

    return result;
  };

  public test = async () => {
    try {
      const result = await api.get('/');

      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}

const equipmentController = new EquipmentController();

export default equipmentController;

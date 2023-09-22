import {Equipment, Files} from '@/helpers/models';
import {api, endpoints} from './api';
import {file1, file2} from './files';

class EquipmentController {
  private array: Equipment[] = [];

  public getEquipment = async (): Promise<Equipment[] | undefined> => {
    return (await api.get(endpoints.GET_EQUIPMENT)).data.equipments;
  };

  public postEquipment = async (data: Equipment) => {
    const result = await api.post(endpoints.POST_EQUIPMENT, data);

    return result;
  };

  public updateStatus = async (status: boolean) => {
    const result = await api.post(endpoints.POST_EQUIPMENT, status);

    return result;
  };
}

const equipmentController = new EquipmentController();

export default equipmentController;

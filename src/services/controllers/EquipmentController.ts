import {Equipment} from '@/helpers/models';
import {api, endpoints} from '../api';
import {BaseController} from './BaseController';

class EquipmentController extends BaseController<Equipment> {
  constructor() {
    super('Equipamento');
  }

  async get(id: string): Promise<Equipment | null> {
    try {
      return (await api.get(endpoints.GET_EQUIPMENT + id)).data.equipment;
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return (await api.delete(endpoints.DELETE_EQUIPMENT + id)).data.equipment;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  }

  public list = async (): Promise<Equipment[]> => {
    try {
      return (await api.get(endpoints.GET_EQUIPMENT)).data.equipments;
    } catch (e) {
      return [];
    }
  };

  public post = async (data: Equipment) => {
    try {
      const {_id, createdAt, updatedAt, ...eq} = data;
      const result = (await api.post(endpoints.POST_EQUIPMENT, eq)).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };

  public updateStatus = async (equipmentId: string, status: boolean) => {
    try {
      const result = (
        await api.patch(endpoints.PATCH_EQUIPMENT_STATUS + equipmentId, {
          isActive: status,
        })
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };

  public update = async (equipmentId: string, equipment: Equipment) => {
    const {_id, createdAt, updatedAt, ...eq} = equipment;
    try {
      const result = (
        await api.patch(endpoints.PATCH_EQUIPMENT_UPDATE + equipmentId, eq)
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };
}

const equipmentController = new EquipmentController();

export default equipmentController;
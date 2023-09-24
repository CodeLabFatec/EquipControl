import {Equipment} from '@/helpers/models';
import {api, endpoints} from './api';

class EquipmentController {
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

  private handleErrors(message: string) {
    let error = 'Erro de comunicação com o servidor.';
    if (message.includes('404')) error = 'Equipamento não encontrado.';
    if (message.includes('422')) error = 'Dados inválidos.';
    if (message.includes('413'))
      error = 'Arquivo(s) enviado(s) excederam o tamanho máximo permitido.';

    return {message: error};
  }
}

const equipmentController = new EquipmentController();

export default equipmentController;

import {Domain} from 'helpers/models/domain';
import {api, endpoints} from '../api';
import {BaseController} from './BaseController';

class DomainController extends BaseController<Domain> {
  constructor() {
    super('Domain');
  }

  async get(id: string): Promise<Domain | null> {
    try {
      return (await api.get(endpoints.GET_DOMAIN + id)).data.domain;
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return (await api.delete(endpoints.DELETE_DOMAIN + id)).data.domain;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  }

  public list = async (): Promise<Domain[]> => {
    try {
      return (await api.get(endpoints.GET_DOMAIN)).data.domain;
    } catch (e) {
      return [];
    }
  };

  public post = async (data: Domain) => {
    try {
      const {_id, ...eq} = data;
      const result = (await api.post(endpoints.POST_DOMAIN, eq)).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };

  // public updateStatus = async (name: string, status: boolean) => {
  //   try {
  //     const result = (
  //       await api.patch(endpoints.PATCH_DOMAIN_STATUS + name, {
  //         isActive: status,
  //       })
  //     ).data;

  //     return result;
  //   } catch (e) {
  //     return this.handleErrors(e.message);
  //   }
  // };

  public update = async (domainId: string, domain: Domain) => {
    const {_id, ...eq} = domain;
    try {
      const result = (
        await api.patch(endpoints.PATCH_DOMAIN_UPDATE + domainId, eq)
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };
}

const domainController = new DomainController();

export default domainController;
